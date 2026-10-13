---
title: "ForgeQB: Recommending Quizbowl Questions"
date: "October 2026"
excerpt: "How we serve question recommendations for a trivia vertical where both timing and accuracy matter, when every question comes with only a broad category and a broad difficulty."
link: "https://forge-qb.com"
stack: ["Electron", "Flask", "SQLite", "FastAPI", "PostgreSQL", "HDBSCAN", "UMAP", "Optuna"]
---

## The problem

How do we serve question recommendations for a trivia vertical (quizbowl competitions) where both answer timing and accuracy matter, when each question only comes with a broad category (e.g. "American History") and a broad difficulty (e.g. "College Regionals")?

## Constraints

- **Speed.** For quizbowl practice, questions must be served fast, both to gamify learning and to mimic real competition environments. Depending on reading speed, players may answer extremely quickly (under 0.2s after a recommendation is served), so a production system must be fast enough to handle repeated back-to-back recommendations.
- **Local hardware.** A key goal was to serve recommendations offline by hosting the Flask API backend on the user's own computer when the Electron app is opened. As a result, the system must be light enough to run on most laptops and have no internet dependence (to allow offline practice).
- **Cost.** This project was budgeted tightly, so all training runs and optimizations must be able to run locally.

## A heuristic recommender

### Thesis

**Vertical knowledge.** When a user studies a single topic in quizbowl (e.g. Claude Monet), they likely gain vertical knowledge, meaning they can answer that topic across a wide range of difficulties. Reading about one topic gives you context that shows up across every difficulty of questions with that answer. There are only so many clues about *Water Lilies*; if you look at the painting and learn the general details, you can probably answer it at most difficulties.

**Horizontal knowledge.** Breadth of knowledge within a category most likely does not grow from studying a single topic. If I study Monet, it doesn't mean I know more about Van Gogh.

> A good recommender should gradually widen horizontal knowledge, with less focus on scaling difficulty within a single topic.

### Why not filter by answer?

The obvious approach is to group questions by their answer within each category. Two problems:

- **Uncleaned answerlines.** Different spellings of the same answer and non-standard characters (non-English phonetics).
- **No measure of relations between answers.** A question may have an answer of Claude Monet or of Impressionism. The knowledge is related, but pure answer-based filtering doesn't capture this.

Controlling for these issues with regex would be extremely painful, and while relations could be measured with naive or hardcoded approaches, it wouldn't be worth it: worse recommendations and extra work.

## Question processing pipeline

The idea: embed each question and answer, cluster questions within categories into **micro-categories**, and serve recommendations based on these micro-categories.

### Embeddings

We tested a small BERT encoder, TF-IDF, and a custom embedding model on the question corpus, evaluated on cluster separation (HDBSCAN silhouette scores) and UMAP/t-SNE plots. **A hybrid TF-IDF + BERT approach gave the best balance of scalability and embedding quality.**

### Dimensionality reduction

We tested no reduction, PCA, UMAP, t-SNE, and PCA followed by UMAP/t-SNE. **PCA → UMAP → clustering gave the best clustering performance** by both silhouette scores and plots.

We also tested which question batches to reduce and cluster together: the whole corpus, by category, by subcategory, and by difficulty. Since we only need micro-clusters within each batch, the embeddings don't need to share a representation space across batches, so we were free to choose whichever batching gave the best separation.

**Batching by subcategory performed best.** Our intuition is that content shared by every question in a subcategory gets filtered out by the dimensionality reduction, leaving the differences between topics to drive the clustering.

### Clustering and tuning

We tested HDBSCAN and KNN-based methods, and chose HDBSCAN since it doesn't need a predefined number of clusters. Hyperparameters were tuned with Bayesian optimization in Optuna, with a new set of parameters for each subcategory run.

## User state

The goal is to measure user progress across categories so the recommender can make informed decisions.

- **Structure.** A multilevel dict, `user_data[category][cluster_id] -> skill`, where skill is a float on the same 0–10 scale as question difficulty. Each micro-cluster gets its own skill value, so a user can be strong on Impressionism and weak on Baroque within the same "Visual Fine Arts" category.
- **Noise.** Questions that HDBSCAN labeled as noise (cluster −1) don't belong to any micro-cluster, so they update a single separate "random skill" instead.
- **Cold start.** New clusters are initialized to the user's self-reported skill (0–10) from the start of the session rather than a global default, since we have no other signal before the first answer.
- **Persistence.** State is serialized to JSON and persisted per category in a local SQLite table (`category_user_state`), so progress carries across sessions while staying fully offline.
- **Repeats.** A short deque of the last 5 seen question ids is kept to avoid serving repeats.

## Updating skill per cluster

$$
\text{expected} = \frac{1}{1 + e^{-(\text{skill} - \text{difficulty})}}
$$

$$
\text{skill}' = \operatorname{clamp}_{[0,\,10]}\Big(\text{skill} + K\,(\text{actual} - \text{expected})\,(1 + \text{celerity})\Big)
$$

with $\text{actual} = 1$ if correct, else $0$, and $K = 0.5$.

**Why the logistic expected score.** This is the same form as Elo, or a 1-parameter IRT (Rasch) model, where the probability of answering correctly depends only on the gap between user skill and question difficulty. Since skill and difficulty live on the same scale, a skill value directly tells us which difficulties to serve.

**Why update on (actual − expected).** The update size is proportional to how surprised we are. Getting a question far below your level right barely moves your skill (expected is about 1), while getting a question above your level right moves it a lot. A user can't farm skill on easy questions, and a single miss on a hard question isn't heavily punished.

**Why celerity.** Quizbowl rewards speed, so accuracy alone loses information. Celerity (0–1, the fraction of the question remaining when the user buzzed) scales the update by up to 2×, so an early correct buzz is treated as stronger evidence of knowledge than a buzz at the end of the question.

**Why K = 0.5 and clamping.** K was chosen so a few consecutive surprising answers move a user about one difficulty level: fast enough to adapt within a single practice session, but not so fast that one lucky guess jumps them a full level. Clamping keeps skill inside the valid difficulty range.

## Serving recommendations from user state

**Cluster selection.** Sample a cluster with probability

$$
P(k) = \operatorname{softmax}(1 - \text{skill})_k
$$

over all clusters in the category, so weaker clusters are exponentially more likely to be served: each point of skill difference is a factor of $e$ in sampling weight. This follows directly from the thesis. The system pushes horizontal knowledge by steering users toward the clusters they're worst at, while sampling (instead of argmax) keeps some variety so users don't get stuck on one weak cluster.

**Difficulty selection.** Once a cluster is chosen, serve a question with difficulty in $[\operatorname{round}(\text{skill}) - 1,\ \operatorname{round}(\text{skill}) + 1]$, clipped to $[1, 10]$. This handles vertical knowledge: difficulty within a cluster scales naturally through the Elo updates rather than being the main driver of recommendations.

**Exploration.** With $\varepsilon = 0.1$, serve a noise (cluster −1) question at the user's random skill level instead, so users still see questions outside of the micro-clusters.

**Fallbacks.** If the chosen cluster has no unseen questions in the difficulty range, that cluster is masked out and the softmax is recomputed over the remaining clusters, up to 5 retries.

**Speed.** Everything here is a dict lookup, a softmax over a handful of clusters, and one indexed SQLite query, so recommendations are served in milliseconds on a laptop with no model inference or internet needed.

## A Deep Q-Network recommender

### Motivation

The heuristic system hard-codes our assumptions: vertical vs. horizontal knowledge, softmax over weak clusters, the ±1 difficulty band. The end goal is to have a model learn the recommendation policy directly instead of us designing it, with the heuristic thesis encoded only in the reward.

### Environment

Since we had no real user data, we built a simulated user. Each simulated user has a 48-dim proficiency vector (0–0.95) over tagged metadata for Visual Fine Arts (eras, mediums, regions, movements; this predates the clusters), initialized near 0 with small Gaussian noise.

- **Simulated answering.** $P(\text{correct}) = \sigma(\bar{p} - d + \epsilon)$, where $\bar{p}$ is the average proficiency on the question's tags, $d$ is the scaled difficulty, and $\epsilon$ is noise, with a simulated buzz speed that drops for harder questions. Proficiency on the tagged topics then moves toward a target: more for correct, fast, and harder questions, less for misses.
- **State and action.** State is the 48-dim proficiency vector. Actions are questions, each represented as a 49-dim vector (48-tag multi-hot + difficulty), sampled from 200 vectorized questions.

### Model

Instead of one output per action, the network scores (state, question) pairs: `concat(state, question) → Dense(64) → Dense(32) → Q`, and we take the argmax over candidate questions. This lets a trained model score questions it never saw during training, which is necessary since the real question bank is about 170k questions.

### Training

Standard DQN: replay buffer of 5000, target network synced every 50 steps, batch size 64, $\gamma = 0.99$, Bellman target $r + \gamma \max_{a'} Q_{\text{target}}(s', a')$, epsilon-greedy with epsilon decayed per episode, and 600-step episodes.

An episode ends when the user is "done": every topic above a minimum proficiency (evenness) and a high enough average proficiency (overall skill). These two conditions are the horizontal knowledge thesis written as a goal state.

## Reward design: sparse vs. dense

### Sparse reward

+10 only on reaching the done state (every topic ≥ 0.3 and average ≥ 0.5), with a small per-step time penalty ($-0.001\,t$). The idea was to tell the agent only what the goal is and let it figure out the path.

**Result.** Reaching the goal takes many good recommendations in a row, so early exploratory episodes rarely see the +10. The main signal the agent gets is the ever-growing time penalty, so it acted like every route leads to failure and couldn't meaningfully rank questions.

Our first "dense" version was effectively also sparse due to a bug: the previous state was saved by reference instead of copied, so the per-step proficiency growth term was always about 0 and the agent only ever saw the time penalty and terminal bonus.

### Dense (shaped) reward

Reward every step with

$$
r_t = 10 \sum_i (1 - p_i^{\text{prev}})\,\Delta p_i \;+\; 2\max\big(0,\ 0.5 - \operatorname{std}(p)\big) \;-\; 0.001 \log(1 + t)
$$

Weighted growth rewards improving weak topics more than strong ones (the same intuition as the $\operatorname{softmax}(1 - \text{skill})$ in the heuristic system), the evenness bonus rewards a balanced profile, and the log time penalty discourages long episodes without dominating. We also lowered the done thresholds (0.2 per topic, 0.4 average) and added partial +5 bonuses for satisfying evenness and average on their own.

**Result: reward hacking.** Every step spent in a near-goal state keeps paying out the evenness bonus and the partial +5 bonuses, while finishing the episode stops all future reward. With $\gamma = 0.99$ (an effective horizon of about 100 steps), the discounted value of staying near the goal is worth more than the terminal reward, so the agent learned to get close to done and then stall until the end of the episode instead of finishing.

### Debugging

To figure out whether the problem was DQN instability or the environment and reward themselves, we also trained a Fitted Q-Iteration model with XGBoost (10 iterations, on transitions collected by a random policy). This removes the moving-target and neural network instability, so if it also fails, the issue is the environment and reward rather than the DQN.

### Takeaways

Sparse rewards are too hard to learn from with long episodes and no demonstrations; dense rewards are learnable but very easy to exploit. Fixing it needs a reward with no positive per-step payout for staying in a state, plus lots of environment and hyperparameter tuning, or other RL algorithms. Potential-based shaping is one option: reward is the change in a potential like weighted average proficiency, which provably doesn't change the optimal policy.

The simulator itself is also built on our assumptions, so real user data is needed before any learned policy would actually beat the heuristic. We shelved this in favor of the heuristic system for release, but it remains the long-term goal.

## Data collection

Both the heuristic system and the RL experiments rest on our assumptions: the vertical/horizontal knowledge thesis, the Elo parameters, the simulated user. The way to remove those assumptions is real interaction data: what we recommended, to whom, and what happened.

### What we log

In the cloud version, every answered question is written to a statistics table in Supabase (Postgres):

| Field | Meaning |
| --- | --- |
| `user_id`, `session_id` | Who, and in which practice session |
| `question_id`, `category`, `difficulty` | What was served |
| `outcome` | Correct or not |
| `celerity`, `submission_time_ms` | How fast |
| `before_stats`, `after_stats` | User state snapshots before and after the answer |
| `timestamp` | When |

The before/after snapshots make each row a full (state, action, result, next state) transition.

### Why the recommender is good for data collection

The heuristic recommender is stochastic with known probabilities:

$$
P(\text{cluster } k \mid \text{state}) = 0.9 \cdot \operatorname{softmax}(1 - \text{skill})_k, \qquad P(\text{noise}) = 0.1
$$

followed by a uniform pick among unseen questions in the difficulty band.

Every cluster always has a nonzero chance of being served (**coverage**), and we can compute exactly how likely each recommendation was (its **propensity**). Both are required for counterfactual evaluation. If we had shipped a deterministic argmax recommender, we would only ever see outcomes for the one cluster it picks and could never evaluate alternatives from the logs.

Each logged recommendation therefore needs to be a tuple of (context = user state, action = cluster + difficulty band + question, propensity = $P(\text{action} \mid \text{context})$ at serve time, reward). The propensity must be logged when the question is served rather than recomputed later, since cluster masking, retries, and the recently-seen filter change the actual probability.

## Counterfactual (off-policy) evaluation

The goal is to estimate how a new recommendation policy would have performed using only data logged under the current one, without shipping it to users first. This fits the cost constraint and avoids testing bad policies on real users.

**Inverse Propensity Scoring (IPS):**

$$
\hat{V}(\pi_{\text{new}}) = \frac{1}{n} \sum_{i=1}^{n} r_i \,\frac{\pi_{\text{new}}(a_i \mid x_i)}{p_i}
$$

Recommendations the new policy would make more often than the old one are upweighted, and vice versa, giving an unbiased estimate as long as the logging policy had coverage. Since IPS can be high variance when propensities are small, we plan to use self-normalized IPS and doubly robust estimators, which combine IPS with a learned reward model $\hat{r}(x, a)$.

This lets us compare candidate changes offline: different softmax temperatures, wider or narrower difficulty bands, different Elo K values, or a learned model.

### Reward definition

Immediate correctness alone is the wrong reward: it would favor serving easy questions, which is the same kind of reward hacking we saw in the RL experiments. Instead, reward is built from learning signals: correctness weighted by difficulty and celerity, the change in user state (after − before), and performance on the same cluster when it is served again later (retention).

## Next: contextual bandits

Replace the hand-tuned softmax with a contextual bandit, where arms are the clusters within a category, context is the user state vector, and reward is the learning signal above. Thompson Sampling or LinUCB would learn which clusters actually produce learning for which kinds of users, instead of assuming weaker clusters are always the best choice.

**Why a bandit before RL.** Each recommendation is treated as a one-step decision, which avoids the long-horizon credit assignment and the sparse vs. dense reward problems from the DQN experiments, and there is no episode termination to exploit. Bandit policies are also stochastic, so they keep producing logged propensities for future counterfactual evaluation.

**Longer term.** The same logs can be used to fit a data-driven simulated user, calibrating $P(\text{correct} \mid \text{skill}, \text{difficulty})$ and the skill update against real outcomes. That would give the DQN a realistic environment to train in instead of one built on our assumptions.
