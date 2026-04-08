export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "Technical" | "Non-Technical" | "Research";
  duration: string;
  bullets: string[];
  pullQuote?: string;
  stats?: string[];
  link?: string;
}

export interface Experience {
  organization: string;
  role: string;
  duration: string;
  description: string[];
}

export const statsHighlights = [
  "Reduced forecast error by 50%.",
  "First-authored 30-page bioinformatics paper.",
  "Led 5 developers for ForgeQB (~500 downloads)."
];

export const technicalProjects: Project[] = [
  {
    slug: "forgeqb",
    title: "ForgeQB",
    subtitle: "AI-Powered Adaptive Quizbowl Learning App",
    category: "Technical",
    duration: "Feb. 2025 - Present",
    link: "forge-qb.com",
    bullets: [
      "Founder, Lead ML & Backend Developer, Outreach Director.",
      "Bootstrapped adaptive-learning Quizbowl desktop app (Electron + FlaskAPI + SQLite) from 0 to ~500 downloads and 24,000 post views (Instagram, Forums), leading a team of 5 engineers.",
      "Engineered NLP question-ingestion and topic-clustering pipeline ending in epsilon-greedy softmax recommendation engine.",
      "Prototyped RL-based question recommendation system using Deep Q-Network (DQN) and student-answering simulation.",
      "Building Supabase PostgreSQL database for hosted cloud implementation, handling query optimization to database calls."
    ],
    pullQuote: "Almost 500 downloads. Still building.",
    stats: ["5 developers", "~500 downloads", "24,000+ post views"]
  },
  {
    slug: "skate-tracker",
    title: "Skate-Tracker",
    subtitle: "AI Skateboarding Coach App",
    category: "Technical",
    duration: "Nov. 2025 - Present",
    bullets: [
      "Solo Developer",
      "Built React Native app delivering text-based skateboarding coaching via RAG on web-scraped wiki knowledge base.",
      "Prototyping video analysis system using Google MediaPipe pose landmarker, OpenCV, and VLMs to compare user trick footage to professional references.",
      "Built trick graph visualization and tracking, allowing for simplified user trick-relationship understanding.",
    ],
    pullQuote: "Building a VLM video analysis pipeline for real-time trick coaching."
  },
  {
    slug: "setos",
    title: "Setos.ai",
    subtitle: "Research Paper Learning Startup Prototype",
    category: "Technical",
    duration: "Jun. 2025 - Nov. 2025",
    bullets: [
      "Project Lead, Backend Developer",
      "Led team of 3 to build AI-powered research onboarding tool indexing 1M+ academic papers (PostgreSQL), enabling users to generate mastery pathways via natural language prompts.",
      "Designed content-based recommendation engine using Sci-BERT embeddings, LLM query expansion, pgvector similarity search, and Kneedle algorithm."
    ]
  }
];

export const technicalExperience: Experience[] = [
  {
    organization: "Fort Bend County Health Department: Epidemiology Division",
    role: "Data Science & ML Intern",
    duration: "Summer 2025",
    description: [
      "Fit XGBoost and Prophet models on 1,000+ historical infectious disease case records, reducing forecasting RMSE by 50% from an ARIMA baseline.",
      "Analyzed 25,000+ mortality records in R to produce statistical report draft for county leadership on leading causes of death in 2021.",
      "Built full data analysis pipeline (SQL + R) featuring age-adjusted mortality rates, T, Chi-Square, and K-S significance testing, and ggplot2 graphs"
    ]
  },
  {
    organization: "Harvard OpenBio Student Research Institute",
    role: "Bioinformatics Researcher (First-Author)",
    duration: "Summer 2025",
    description: [
      "Lead bioinformatics research project regarding pancancer tumor mutation effects on gene expression and gene expression dimensionality under PHD student Mentor.",
      "Applied unsupervised learning techniques (Principal Component Analysis, Partial Least Squares Regression) to mRNA-sequencing data from The Cancer Genome Atlas (3527 Tumors).",
      "First-authored 30 Page research paper on project results; abstract is to be published in Harvard Affiliated Issue of STEM Fellowship Journal"
    ]
  }
];

export const nonTechnicalRoles = [
  {
    organization: "Quizbowl Club, Seven Lakes High School",
    role: "Co-President; Vice-President; Varsity Player",
    duration: "2022 - Present",
    description: [
      "Led 20+ member practices; built AI flashcard/poetry tools resulting in a 10x subcategory improvement.",
      "Organized scrimmages & wrote practice questions. Secured 1st place in the 2025 TQBA TX State Championship and placed 33rd at the 2025 NAQT HS Nationals."
    ]
  },
  {
    organization: "UNICEF Club, Seven Lakes High School",
    role: "Co-President; Sophomore Representative",
    duration: "2023 - 2025",
    description: [
      "Partnered with Texas Children's Hospital and facilitated craft activities for 30+ volunteers creating pediatric comfort care items.",
      "Managed Instagram outreach & officer recruiting system."
    ]
  },
  {
    organization: "Leading2Succeed",
    role: "Event Planner",
    duration: "2025 - Present",
    description: [
      "Organized fundraising events for 40+ members dedicated to supporting special needs children.",
      "Collaborated in sales outreach to support local special needs artists."
    ]
  }
];

export const research = {
  title: "Harvard OpenBio Student Research Institute",
  role: "Student Researcher (First-Author)",
  duration: "Summer 2025",
  abstract: "Lead bioinformatics research project regarding pancancer tumor mutation effects on gene expression and gene expression dimensionality under PHD student Mentor. Applied unsupervised learning techniques (Principal Component Analysis, Partial Least Squares Regression) to mRNA-sequencing data from The Cancer Genome Atlas (3527 Tumors). First-authored 30 Page research paper on project results; abstract is to be published in Harvard Affiliated Issue of STEM Fellowship Journal",
  pullQuote: "Uncovering gene expression dimensionality across pancancer tumor mutations."
};

export const skillsGraphData = {
  nodes: [
    { id: "Python", group: 1 },
    { id: "TypeScript", group: 1 },
    { id: "Machine Learning", group: 2 },
    { id: "XGBoost", group: 2 },
    { id: "Prophet", group: 2 },
    { id: "RAG & LLM", group: 2 },
    { id: "NLP", group: 2 },
    { id: "React Native", group: 3 },
    { id: "PostgreSQL", group: 4 },
    { id: "pgvector", group: 4 },
    { id: "Next.js", group: 1 },
  ],
  links: [
    { source: "Python", target: "Machine Learning", strength: 0.8 },
    { source: "Machine Learning", target: "XGBoost", strength: 0.6 },
    { source: "Machine Learning", target: "Prophet", strength: 0.6 },
    { source: "Python", target: "RAG & LLM", strength: 0.7 },
    { source: "Python", target: "NLP", strength: 0.7 },
    { source: "TypeScript", target: "React Native", strength: 0.7 },
    { source: "TypeScript", target: "Next.js", strength: 0.7 },
    { source: "PostgreSQL", target: "pgvector", strength: 0.9 },
    { source: "RAG & LLM", target: "pgvector", strength: 0.6 },
  ]
};
