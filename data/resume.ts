/**
 * Single source of truth for site content.
 *
 * Facts (organizations, dates, metrics, stacks) are ported verbatim from
 * new-resume.txt. Narrative fields (`deck`, `narrative`, `pullQuote`) are
 * drafted prose and are flagged in NOTES.md for review.
 */

export type Track = "research" | "engineering";

export interface Appointment {
  slug: string;
  organization: string;
  /** Lab, program, or division within the organization. */
  unit?: string;
  role: string;
  location: string;
  duration: string;
  /** Sorts newest-first. Higher runs first. */
  order: number;
  /** One-line editorial deck. DRAFTED. */
  deck: string;
  /** Two or three sentence editorial profile, per planning_docs/ui.md. DRAFTED. */
  narrative: string;
  /** Verbatim resume bullets. Factual. */
  bullets: string[];
  stack: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  order: number;
  /** One-line editorial deck. DRAFTED. */
  deck: string;
  bullets: string[];
  pullQuote?: string;
  /** Rendered as tabular figures in a stat row. */
  stats?: { value: string; label: string }[];
  stack: string[];
  link?: string;
}

export interface ArchiveEntry {
  organization: string;
  role: string;
  duration: string;
  description: string[];
}

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Arjun Desikan",
  school: "University of California, Berkeley",
  degree: "B.A. Data Science and Computer Science",
  gpa: "4.0/4.0",
  gradYear: "2028",
  location: "Berkeley, CA",
  email: "arjundesikan2008@gmail.com",
  linkedin: "https://www.linkedin.com/in/arjun-desikan-320b76304/",
  instagram: "https://www.instagram.com/arjun_desikan",
  issueLine: "Vol. II, 2026",
  issueName: "The Research Issue",
};

/** Adapted from Arjun's own LinkedIn bio. His voice, trimmed. */
export const thesis =
  "Hi there, I'm Arjun. I'm a Berkeley data science and CS double major in love with representation learning and time series methods.";

/** Adapted from Arjun's own LinkedIn bio. His voice, trimmed. */
export const standfirst =
  "Right now I'm developing stock embeddings at MIT CSAIL and tactile feedback models at Johns Hopkins. I'm still experimenting with different niches and figuring out what to specialize in. Lately AI safety has sparked my interest, which is what pulled me into the MIT AI Safety Fundamentals Fellowship and Apart Research's Secure Program Synthesis Fellowship.";

/** Cover lines. Each maps to a verifiable resume fact. */
export const statsHighlights = [
  "Cut county disease forecasting error in half.",
  "First-authored paper analyzing 3,527 tumors.",
  "500 downloads on a quizbowl adaptive-learning app.",
];

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export const appointments: Appointment[] = [
  {
    slug: "mit-csail-mantis",
    organization: "MIT Computer Science & Artificial Intelligence Laboratory",
    unit: "Mantis",
    role: "Quantitative Finance Researcher & Software Engineer",
    location: "Cambridge, MA",
    duration: "May 2026 - Present",
    order: 100,
    deck: "Teaching a model to recognize what regime a market is in, without being told.",
    narrative:
      "Financial markets are a labeling problem before they are a prediction problem. Nobody hands you the ground truth for what regime you are currently in, so the model has to find that structure itself. The evaluation stack exists to check that the learned embeddings encode something real rather than something memorized. The other half of the role is shipping the platform the research runs on.",
    bullets: [
      "Designed a novel self-supervised temporal representation learning framework for financial markets to learn regime-aware stock embeddings from multimodal market data.",
      "Built scalable financial data and evaluation pipelines in PyTorch, benchmarking learned embeddings using information coefficient metrics, linear probing, UMAP visualization, and out-of-sample portfolio backtesting.",
      "Developed production features for the Mantis platform using React, TypeScript, FastAPI, Zustand, and Docker, contributing bug-fixes, feature improvements, and visualization tooling.",
      "Designed and implemented a full-stack swarm intelligence simulation framework into Mantis with aligned UMAP visualizations to model evolving agent beliefs, emotions, and personalities.",
    ],
    stack: ["PyTorch", "React", "TypeScript", "FastAPI", "Zustand", "Docker"],
  },
  {
    slug: "jhu-intelliphysics",
    organization: "Johns Hopkins University",
    unit: "Centrum IntelliPhysics",
    role: "Scientific Machine Learning Researcher",
    location: "Remote",
    duration: "May 2026 - Present",
    order: 90,
    deck: "Predicting what a surface feels like from a picture of it.",
    narrative:
      "Touch and sight encode the same surface differently, and the gap between them is a learnable function. This project builds that function, taking visual texture in and predicting tactile acceleration out, then tries hard to break it by holding out entire material families and trial velocities. The sharpest limitation turned out to be frequency: DeepONets degrade on the high-frequency components, which is what pushed the work toward FFT representations.",
    bullets: [
      "Developed CNN-MLP latent fusion and DeepONet neural operator baselines in PyTorch to predict tactile acceleration signals from visual surface textures for multimodal tactile signal prediction.",
      "Evaluated cross-material and cross-velocity generalization using held-out material families and trial velocities to assess model robustness.",
      "Identified limitations of DeepONets on high-frequency tactile signals and proposed frequency-domain modeling using FFT representations to improve learning stability and reconstruction quality.",
    ],
    stack: ["PyTorch", "DeepONet", "CNN-MLP", "FFT"],
  },
  {
    slug: "theorem-apart",
    organization: "Theorem.dev",
    unit: "Secure Program Synthesis Fellowship, Apart Research",
    role: "AI Safety Research Fellow",
    location: "Remote",
    duration: "June 2026 - Present",
    order: 80,
    deck: "If a language model writes the specification, who checks the specification?",
    narrative:
      "Formal verification is only as trustworthy as the specification you verify against, which becomes an uncomfortable question once the specification itself is model-generated. This pipeline synthesizes ACSL specifications for C programs and then refuses to take them on faith. Property-based testing, mutation testing, variant discovery, and SMT solving all run as an adversarial loop against the model's own output.",
    bullets: [
      "Developing an automated specification synthesis pipeline for C programs in ACSL using Python, Frama-C, and SMT-based formal verification tools to improve reliability of LLM-generated specifications.",
      "Designed an iterative verification framework combining property-based testing, mutation testing, variant discovery, and formal verification loops for agent-driven specification refinement.",
      "Implemented novel memory-augmented multi-agent architecture and verification loops to improve inductive proof generation and SMT formal verification rates.",
    ],
    stack: ["Python", "Frama-C", "ACSL", "SMT Solvers"],
  },
  {
    slug: "harvard-openbio",
    organization: "Harvard OpenBio Student Research Institute",
    role: "Student Researcher, First Author",
    location: "Remote",
    duration: "Summer 2025",
    order: 70,
    deck: "What copy number damage does to the shape of gene expression.",
    narrative:
      "Somatic copy number alterations are usually studied for what they do to individual genes. This project asked a structural question instead: what do they do to the dimensionality of expression across a whole tumor cohort? Across 3,527 tumors that turned out to be a relationship worth writing up, which became a 30-page first-authored paper.",
    bullets: [
      "Led a pancancer bioinformatics research project analyzing somatic copy number alteration effects on gene expression across 3,527 tumors, under PhD-student mentorship.",
      "Applied PCA, PLS, and multiple linear regression to mRNA-sequencing data finding a novel relationship between SCNAs and pancancer RNA-seq dimensionality.",
      "First-authored 30-page research paper on project results; abstract published in Harvard OpenBio affiliated issue of STEM Fellowship Journal.",
    ],
    stack: ["PCA", "PLS", "R", "RNA-seq"],
  },
];

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

export const internship: Appointment = {
  slug: "fort-bend",
  organization: "Fort Bend County Health Department",
  unit: "Epidemiology Division",
  role: "Data Science Intern",
  location: "Missouri City, TX",
  duration: "Summer 2025",
  order: 60,
  deck: "Statistics that a county government actually had to act on.",
  narrative:
    "County epidemiology is where modeling stops being an exercise. The mortality brief went to county leadership as a decision document, which changes how you handle a marginal p-value. The forecasting half was more conventional and more satisfying: gradient boosting and Prophet against an ARIMA baseline, and the baseline lost by a wide margin.",
  bullets: [
    "Led analysis of 2021 mortality data in R, drafting a statistical brief for county leadership on leading causes of death across 5 demographic subgroups.",
    "Built an end-to-end mortality analytics pipeline (SQL, R) computing age-adjusted rates and running T-tests, Chi-Square, and K-S tests, visualized via ggplot2.",
    "Implemented XGBoost and Prophet models to forecast county infectious disease cases, reducing RMSE by over 50% compared to ARIMA baseline.",
  ],
  stack: ["R", "SQL", "XGBoost", "Prophet", "ggplot2"],
};

export const projects: Project[] = [
  {
    slug: "forgeqb",
    title: "ForgeQB",
    subtitle: "Adaptive-learning desktop app for Quizbowl",
    duration: "Feb. 2025 - Present",
    order: 100,
    link: "https://forge-qb.com",
    deck: "A study tool that figures out what you are bad at, then keeps asking about it.",
    bullets: [
      "Founder. Led a team of 4 developers nationwide to build an adaptive-learning quizbowl study app, reaching 500 downloads and 24k+ post views.",
      "Engineered NLP question ingestion and topic clustering pipeline and epsilon-greedy softmax-based question recommendation system, tailoring question topics to user weaknesses.",
      "Prototyped RL-based recommendation approach using DQN and student-answering simulation across reward structures to benchmark against production softmax system.",
    ],
    pullQuote:
      "I built the recommendation system, recruited the team, and filmed a few excruciatingly embarrassing outreach videos.",
    stats: [
      { value: "4", label: "Developers led" },
      { value: "500", label: "Downloads" },
      { value: "24k+", label: "Post views" },
    ],
    stack: ["Electron", "Flask", "SQLite", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "setos",
    title: "setos.ai",
    subtitle: "Personalized learning pathways across the literature",
    duration: "June 2025 - Nov. 2025",
    order: 90,
    deck: "Describe what you want to understand; get the reading order that gets you there.",
    bullets: [
      "Led a 3-person team to build a platform generating personalized learning pathways across 1,000,000+ research papers using natural language queries.",
      "Designed a content-based recommendation engine using SciBERT embeddings, pgvector similarity search, LLM-based query expansion, and the kneedle algorithm to auto-tune pathway length.",
    ],
    pullQuote: "The hard part was never retrieval. It was knowing when to stop.",
    stats: [
      { value: "1M+", label: "Papers indexed" },
      { value: "3", label: "Team size" },
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "pgvector", "SciBERT"],
  },
  {
    slug: "ecg-classification",
    title: "ECG Classification",
    subtitle: "1D CNN for cardiac abnormality detection",
    duration: "Spring 2026",
    order: 80,
    deck: "A model that finds the abnormality, and shows you which heartbeat convinced it.",
    bullets: [
      "Trained 1D CNN in PyTorch for ECG abnormality classification, achieving AUC of 0.98 on first-pass modeling.",
      "Interpreted model predictions via Grad-CAM, identifying decision-driving signal regions (ST-segment, QRS complex) for clinical explainability.",
      "Optimized model performance through Optuna hyperparameter search, tuning dropout, batch sizes, and learning rate scheduling.",
    ],
    pullQuote:
      "Grad-CAM put the model's attention on the ST-segment and QRS complex, the same places a cardiologist looks.",
    stats: [{ value: "0.98", label: "AUC, first pass" }],
    stack: ["Python", "PyTorch", "Grad-CAM", "Optuna"],
  },
  {
    slug: "equities-backtesting",
    title: "Equities Backtesting Dashboard",
    subtitle: "Systematic strategy testing with Monte Carlo risk analysis",
    duration: "February 2026",
    order: 70,
    deck: "Backtests lie by default. This one is built to be argued with.",
    bullets: [
      "Built an interactive backtesting platform for systematic equity strategies including EMA crossover momentum and mean-reversion, with configurable parameters (EMA horizons, log return thresholds, position sizing).",
      "Integrated Monte Carlo simulation framework (block bootstrap, parametric methods) for forward-looking risk analysis and strategy stress-testing across any input ticker.",
      "Designed modular architecture allowing rapid iteration on strategy logic, enabling side-by-side performance comparison across parameter regimes.",
    ],
    stack: ["Python", "Streamlit", "Pandas", "NumPy"],
  },
  {
    slug: "skate-tracker",
    title: "Skate-Tracker",
    subtitle: "Pose-based skateboarding coach",
    duration: "Nov. 2025 - Present",
    order: 60,
    deck: "Comparing your kickflip to a professional's, frame by frame.",
    bullets: [
      "Solo developer.",
      "Built React Native app delivering text-based skateboarding coaching via RAG on a web-scraped wiki knowledge base.",
      "Prototyping video analysis using Google MediaPipe pose landmarker, OpenCV, and VLMs to compare user trick footage to professional references.",
      "Built trick graph visualization and tracking to make trick relationships legible to learners.",
    ],
    pullQuote: "Building a VLM video analysis pipeline for real-time trick coaching.",
    stack: ["React Native", "MediaPipe", "OpenCV", "RAG"],
  },
];

/* ------------------------------------------------------------------ */
/* Research interests                                                  */
/* ------------------------------------------------------------------ */

/**
 * The domains from the resume, each pointed at the work that evidences it.
 * `content.md`: "Every section should link to evidence. Claims without proof
 * get cut." A domain nobody can check is a claim.
 */
export const researchInterests = [
  {
    domain: "Representation Learning",
    where: "MIT CSAIL, Harvard OpenBio",
    href: "/research#mit-csail-mantis",
  },
  {
    domain: "Scientific Machine Learning",
    where: "Johns Hopkins",
    href: "/research#jhu-intelliphysics",
  },
  {
    domain: "Physics-Informed Machine Learning",
    where: "Johns Hopkins",
    href: "/research#jhu-intelliphysics",
  },
  {
    domain: "Quantitative Finance",
    where: "MIT CSAIL, Equities Backtesting",
    href: "/research#mit-csail-mantis",
  },
  {
    domain: "Formal Verification",
    where: "Theorem.dev, Apart Research",
    href: "/research#theorem-apart",
  },
  {
    domain: "Bioinformatics",
    where: "Harvard OpenBio",
    href: "/research#harvard-openbio",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/**
 * NOT RENDERED. The Interests page used to print this as an index of tools;
 * it now shows research interests instead.
 *
 * Kept because it is the faithful record of the resume's skills section, and
 * because twelve of these appear nowhere else on the site: Java, JavaScript,
 * TensorFlow, Scikit-learn, Graph Neural Networks, Contrastive Learning,
 * Neural Operators, SciPy, Matplotlib, TidyVerse, Git, REST APIs. Everything
 * else is covered by a `stack` on the entry where it was used, which is better
 * evidence than a list. If those twelve need a home, this is the source.
 */
export const skills = {
  "Programming Languages": ["Python", "Java", "SQL", "R", "JavaScript"],
  "AI / ML": [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "XGBoost",
    "Neural Networks",
    "Graph Neural Networks",
    "Contrastive Learning",
    "Neural Operators",
    "Time-Series",
    "NLP",
  ],
  "Data & Scientific Computing": [
    "Pandas",
    "NumPy",
    "SciPy",
    "Matplotlib",
    "PostgreSQL",
    "pgvector",
    "TidyVerse",
    "ggplot2",
  ],
  "Software Engineering": [
    "React",
    "FastAPI",
    "Flask",
    "Docker",
    "Git",
    "REST APIs",
    "Electron",
  ],
  Domains: [
    "Representation Learning",
    "Scientific Machine Learning",
    "Physics-Informed ML",
    "Bioinformatics",
    "Quantitative Finance",
    "Formal Verification",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Interests                                                           */
/* ------------------------------------------------------------------ */

export const interests = [
  {
    topic: "Badminton",
    detail:
      "I spent much of high school playing competitively, and I still play recreationally. Hit me up if you're ever trying to play.",
  },
  {
    topic: "Quizbowl",
    detail:
      "I love studying trivia, particularly art history, philosophy, and social science. More recently I've been reading theoretical physics and its connections to CS and AI.",
  },
  {
    topic: "Tennis",
    detail:
      "I've been playing a lot of tennis with friends. I'm trying to learn an actual backhand (help. please).",
  },
];

/* ------------------------------------------------------------------ */
/* Archive: pre-Berkeley leadership, kept but demoted                  */
/* ------------------------------------------------------------------ */

export const archive: ArchiveEntry[] = [
  {
    organization: "Quizbowl Club, Seven Lakes High School",
    role: "Co-President; Vice-President; Varsity Player",
    duration: "2022 - 2026",
    description: [
      "Led practices for 20+ members and built AI flashcard and poetry tools that produced a 10x subcategory improvement.",
      "Organized scrimmages and wrote practice questions. Secured 1st place at the 2025 TQBA Texas State Championship and placed 33rd at 2025 NAQT HS Nationals.",
    ],
  },
  {
    organization: "UNICEF Club, Seven Lakes High School",
    role: "Co-President; Sophomore Representative",
    duration: "2023 - 2025",
    description: [
      "Partnered with Texas Children's Hospital and ran craft activities for 30+ volunteers making pediatric comfort-care items.",
      "Managed Instagram outreach and the officer recruiting system.",
    ],
  },
  {
    organization: "Leading2Succeed",
    role: "Event Planner",
    duration: "2025 - 2026",
    description: [
      "Organized fundraising events for 40+ members supporting children with special needs.",
      "Collaborated on sales outreach supporting local special-needs artists.",
    ],
  },
];
