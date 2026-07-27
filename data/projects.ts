import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    slug: "samridh-fighter-pilot-helmet",
    title: "Samridh",
    tagline: "Next-Generation AI-Powered Fighter Pilot Helmet",
    description:
      "A high-precision AI-powered helmet for fighter pilots enabling 360° battlefield awareness — an Iron-Man-style HUD built for combat environments.",
    longDescription:
      "Samridh is an AI-driven fighter pilot helmet delivering immersive, real-time battlefield data. It fuses sensor input into a live heads-up display, giving pilots 360° situational awareness in combat environments. The project is the subject of 3 authored research papers and a filed patent.",
    category: "embedded",
    status: "in-progress",
    featured: true,
    coverImage: "/images/projects/samridh-cover.jpg",
    images: [],
    techStack: [
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "Pandas", color: "#150458" },
      { name: "Scikit-Learn", color: "#F7931E" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "CNNs", color: "#8b5cf6" },
      { name: "n8n", color: "#EA4B71" },
    ],
    features: [
      {
        title: "360° Battlefield Awareness",
        description: "Real-time sensor fusion delivered directly into the pilot's HUD",
        icon: "Radar",
      },
      {
        title: "Research-Backed",
        description: "3 authored research papers and a drafted patent",
        icon: "FileText",
      },
    ],
    challenges: [],
    timeline: [],
    metrics: [
      { label: "Research Papers", value: "3" },
    ],
    problem:
      "Fighter pilots need instantaneous, fused situational data rather than siloed instrument readouts, especially in high-stress combat scenarios where every second of cognitive load matters.",
    architecture:
      "An AI-powered helmet system built around CNN-based perception models trained with PyTorch and TensorFlow, with n8n orchestrating data workflows feeding a real-time HUD overlay.",
    results:
      "Authored 3 research papers and drafted a patent.",
    futureWork: ["Integrate with NeuroSystem for thought-to-target lock-in", "Field trials with live pilot feedback"],
    tags: ["AI & Cyber", "Embedded AI", "Defence Tech", "Computer Vision"],
    startDate: "2024",
    teamSize: 1,
    role: "Lead Researcher & Developer",
    relatedProjects: ["3"],
  },
  {
    id: "2",
    slug: "biorythm-ecg-device",
    title: "BioRythm",
    tagline: "New-Generation ECG Device",
    description:
      "An end-to-end hardware-to-cloud ECG monitoring system with a custom AI model analyzing 6 cardiovascular parameters at 95%+ anomaly-detection accuracy.",
    longDescription:
      "BioRythm is a full hardware-to-cloud ECG monitoring pipeline: custom sensor hardware streams cardiac signals to an AI model that analyzes 6 cardiovascular parameters in real time, flagging anomalies with 95%+ accuracy. The project was selected to showcase at SRISHTI 2025, Karnataka's premier project expo, and is backed by 3 authored research papers and 3 drafted patents.",
    category: "embedded",
    status: "completed",
    featured: true,
    coverImage: "/images/projects/biorythm-cover.jpg",
    images: [],
    techStack: [
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "MERN Stack", color: "#47A248" },
      { name: "CNN", color: "#8b5cf6" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "Detectron2", color: "#3b82f6" },
      { name: "Ollama", color: "#000000" },
      { name: "Arduino IDE", color: "#00979D" },
      { name: "Power BI", color: "#F2C811" },
    ],
    features: [
      {
        title: "95%+ Anomaly Detection",
        description: "Custom AI model analyzing 6 cardiovascular parameters",
        icon: "HeartPulse",
      },
      {
        title: "Hardware-to-Cloud Pipeline",
        description: "End-to-end ECG monitoring from sensor to dashboard",
        icon: "CloudCog",
      },
      {
        title: "Showcased at SRISHTI 2025",
        description: "Karnataka's premier project expo",
        icon: "Award",
      },
    ],
    challenges: [],
    timeline: [],
    metrics: [
      { label: "Anomaly Detection", value: "95", unit: "%+" },
      { label: "Cardiovascular Params", value: "6" },
      { label: "Research Papers", value: "3" },
      { label: "Patents Drafted", value: "3" },
    ],
    problem:
      "Continuous, accessible cardiac monitoring outside hospital settings requires a device that can go from raw sensor signal to an actionable anomaly flag without a cardiologist in the loop.",
    architecture:
      "Arduino-based ECG hardware streams signal to a MERN-stack backend; a PyTorch/TensorFlow CNN model (with Detectron2 for auxiliary signal segmentation and Ollama for report generation) analyzes 6 cardiovascular parameters, with Power BI dashboards for visualization.",
    results:
      "95%+ accuracy in anomaly detection across 6 cardiovascular parameters. Selected to showcase at SRISHTI 2025. Authored 3 research papers and drafted 3 patents.",
    futureWork: ["Clinical validation trials", "Miniaturized wearable form factor"],
    tags: ["Embedded AI", "Healthtech", "Signal Processing", "IoT"],
    startDate: "2024",
    teamSize: 1,
    role: "Lead Researcher & Developer",
    relatedProjects: ["3"],
  },
  {
    id: "3",
    slug: "neurosystem-eeg-target-acquisition",
    title: "NeuroSystem",
    tagline: "EEG-Based Thought-to-Target AI System",
    description:
      "An EEG-based target acquisition system for fighter pilots, reading intent directly from the brain and enabling enemy target lock-in within fractions of a second.",
    longDescription:
      "NeuroSystem is an EEG-based AI system that enables fighter pilots to achieve enemy target lock-in within fractions of a second using neural signal processing — reading intent directly from the brain in under 350ms. It's designed to integrate with Samridh's HUD. The project won 1st Prize at AI Cohort 2025, was selected for APF 2025, received ₹50,000 in funding, and resulted in a published research paper and a filed patent.",
    category: "ai-ml",
    status: "in-progress",
    featured: true,
    coverImage: "/images/projects/neurosystem-cover.jpg",
    images: [],
    techStack: [
      { name: "Pandas", color: "#150458" },
      { name: "Scikit-Learn", color: "#F7931E" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "CNNs", color: "#8b5cf6" },
      { name: "MERN Stack", color: "#47A248" },
      { name: "Flask", color: "#000000" },
      { name: "Embedded AI", color: "#f59e0b" },
    ],
    features: [
      {
        title: "Sub-350ms Target Lock",
        description: "Reads intent directly from neural signals via custom ML pipelines",
        icon: "Zap",
      },
      {
        title: "Custom Signal Classification",
        description: "Purpose-built ML pipelines for neural signal classification",
        icon: "BrainCircuit",
      },
      {
        title: "1st Prize — AI Cohort 2025",
        description: "Selected for APF 2025, ₹50,000 in funding, published paper + filed patent",
        icon: "Trophy",
      },
    ],
    challenges: [],
    timeline: [],
    metrics: [
      { label: "Target Lock Time", value: "<350", unit: "ms" },
      { label: "Funding", value: "50K", unit: "INR" },
    ],
    problem:
      "Manual targeting interfaces introduce latency that matters in combat scenarios — reading pilot intent directly from neural signals removes that bottleneck.",
    architecture:
      "EEG signal acquisition feeds a custom ML pipeline (Pandas/Scikit-Learn preprocessing into a PyTorch CNN classifier) for real-time neural signal classification, served via a Flask API to a MERN-stack interface, engineered for embedded deployment.",
    results:
      "Won 1st Prize at AI Cohort 2025. Selected for APF 2025. Received ₹50,000 in funding. Published a research paper and filed a patent.",
    futureWork: ["Deeper integration with Samridh's HUD", "Reduce latency further below 350ms"],
    tags: ["Benjamin Libet Algorithm", "LST", "AST", "Machine Protocol", "Device Orchestration", "Embedded AI"],
    startDate: "2025",
    teamSize: 1,
    role: "Lead Researcher & Developer",
    relatedProjects: ["1"],
  },
  {
    id: "4",
    slug: "ark-comprehension-fingerprinting",
    title: "ARK",
    tagline: "Personalized Learning at the Edge",
    description:
      "An offline-first AI system for classrooms that detects *why* a student misunderstood a concept, not just whether their answer was right — via a 'Comprehension Fingerprinting' engine.",
    longDescription:
      "ARK (formerly ECHO) tackles the 'hidden gap' in low-resource classrooms: a 1:40 teacher-to-student ratio makes it impossible to track individual mental models in real time. ARK's 5-layer cognitive pipeline (Parser → Matcher → Scorer → Classifier → Remedy) runs student answers through an H-6 concept hexgraph, classifying misunderstandings into five distinct 'fingerprints' — GHOST, HOLLOW, FRAGMENT, INVERT, and ORPHAN — each pointing to a different root cause. Teachers get a live class-wide gap heatmap and auto-generated remediation (plain-language fixes, rural analogies, Socratic questions, or peer-matching), while the whole system runs 80% offline via a local Ollama vision-language model, with deep Hindi/Kannada/English support for real classroom multilingualism.",
    category: "ai-ml",
    status: "completed",
    featured: true,
    coverImage: "/images/projects/ark-cover.jpg",
    images: [],
    techStack: [
      { name: "React Native", color: "#61DAFB" },
      { name: "FastAPI", color: "#009688" },
      { name: "Ollama", color: "#000000" },
      { name: "Redis", color: "#DC382D" },
      { name: "MongoDB", color: "#47A248" },
      { name: "WebSocket", color: "#8b5cf6" },
    ],
    features: [
      {
        title: "Comprehension Fingerprinting",
        description: "Classifies student misunderstanding into 5 distinct mental-model patterns, not just right/wrong",
        icon: "Fingerprint",
      },
      {
        title: "5-Layer Cognitive Pipeline",
        description: "Parser → Matcher → Scorer → Classifier → Remedy, tracing gaps back to their root cause",
        icon: "GitBranch",
      },
      {
        title: "80% Offline",
        description: "Local cache + on-device Ollama LLM covers 50+ common remedies with zero connectivity",
        icon: "WifiOff",
      },
      {
        title: "Live Teacher Dashboard",
        description: "Real-time class-wide gap heatmap, action items, and auto peer-tutor matching",
        icon: "LayoutDashboard",
      },
    ],
    challenges: [],
    timeline: [],
    metrics: [
      { label: "Teacher:Student Ratio Addressed", value: "1:40" },
      { label: "Offline Capability", value: "80", unit: "%" },
      { label: "Fingerprint Types", value: "5" },
      { label: "Languages Supported", value: "3+" },
    ],
    problem:
      "The average teacher-student ratio in rural Indian classrooms is 1:40, and 80% of schools have unreliable connectivity — teachers have no way to track individual students' mental models in real time, so misconceptions compound silently across grades.",
    architecture:
      "A React Native (Expo) mobile app collects student responses and syncs over LAN WiFi to a FastAPI backend running the 5-layer hexgraph pipeline, powered by a locally-hosted Ollama model (qwen2.5-vl:7b) for text/vision/multilingual processing. Redis handles offline caching and pub/sub sync queues, MongoDB stores persistent student records, and a WebSocket-driven teacher dashboard (with 10s-polling fallback) visualizes live class-wide comprehension gaps.",
    results:
      "Built as a full working prototype — mobile app, FastAPI backend, and live teacher dashboard — with 80% of common remediation cases servable fully offline via local cache, and multilingual support for Hindi, Kannada, and English.",
    futureWork: [
      "Expand the H-6 hexgraph beyond grade 6 science to more subjects and grades",
      "Pilot in real rural classrooms for longitudinal gap-tracking data",
      "Expand regional language coverage",
    ],
    tags: ["EdTech", "Offline-First AI", "LLM", "React Native", "RAG"],
    startDate: "2024",
    role: "Developer",
    relatedProjects: [],
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] =>
  category === "all" ? projects : projects.filter((p) => p.category === category);

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "robotics", label: "Robotics" },
  { id: "iot", label: "IoT & Embedded" },
  { id: "embedded", label: "Embedded" },
  { id: "web", label: "Web" },
] as const;
