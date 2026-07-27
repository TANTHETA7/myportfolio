/**
 * Resume Data
 *
 * This is the structured version of your resume PDF.
 * Update this file whenever you update your resume.
 * The Resume section of the portfolio reads from here.
 *
 * Tip: Replace /public/resume.pdf with your latest resume at the same time.
 */

export interface ResumeContact {
  name: string;
  email: string;
  phone?: string;
  location: string;
  github: string;
  linkedin: string;
  website?: string;
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  relevant?: string[];
  achievements?: string[];
}

export interface ResumeExperience {
  role: string;
  organization: string;
  location: string;
  type: "work" | "internship" | "research" | "education";
  startDate: string;
  endDate: string;
  current?: boolean;
  highlights: string[];
  technologies: string[];
}

export interface ResumeProject {
  name: string;
  link?: string;
  techStack: string[];
  highlights: string[];
}

export interface ResumeAward {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  contact: ResumeContact;
  objective: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
    hardware: string[];
    concepts: string[];
  };
  awards: ResumeAward[];
  certifications: ResumeCertification[];
  publications: Array<{
    title: string;
    venue: string;
    year: number;
    status: string;
    link?: string;
  }>;
}

export const resumeData: ResumeData = {
  contact: {
    name: "Tanmay",
    email: "tanmaynew25@gmail.com",
    location: "Bengaluru, India",
    github: "https://github.com/TANTHETA7",
    linkedin: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
  },

  objective:
    "Aspiring Computer Science and Data Science student seeking opportunities to apply skills in machine learning, intelligent systems, and software development to real-world challenges. Committed to leveraging strong problem-solving abilities, hands-on project experience, and a passion for innovation to contribute to impactful, technology-driven solutions while continuously expanding expertise in AI and scalable system design.",

  education: [
    {
      degree: "Bachelor of Engineering — Computer Science & Data Science",
      institution: "CMR Institute of Technology",
      location: "Bengaluru, India",
      gpa: "8.0 / 10.0",
      startDate: "Aug 2024",
      endDate: "Expected 2028",
      achievements: [
        "Finalist: Manthan 2025, Vishwakarma Awards 2025",
        "Top positions — SRISHTI, SIH, Vyuhatech & IEEE Rapid Innovation Challenge",
      ],
    },
  ],

  experience: [
    {
      role: "Quality Check Intern",
      organization: "Incanus Technologies Pvt. Ltd. (Newton School)",
      location: "Bangalore, India",
      type: "internship",
      startDate: "Jul 2025",
      endDate: "Sep 2025",
      highlights: [
        "Completed a 2.5-month internship demonstrating responsibility, sincerity, and eagerness to take on new challenges",
        "Actively and thoroughly involved in assigned quality check responsibilities, contributing to internal process improvements",
        "Demonstrated strong work ethic and professional conduct, earning recognition from leadership for willingness to learn and adapt",
      ],
      technologies: ["Quality Assurance", "Process Documentation"],
    },
  ],

  projects: [
    {
      name: "Samridh — Next-Generation Fighter Pilot Helmet",
      techStack: ["PyTorch", "Pandas", "Scikit-Learn", "TensorFlow", "CNNs", "n8n"],
      highlights: [
        "Designed a high-precision AI-powered helmet for fighter pilots enabling 360° battlefield awareness",
        "Authored 3 research papers and drafted a patent",
      ],
    },
    {
      name: "BioRythm — New-Gen ECG Device",
      techStack: ["PyTorch", "MERN Stack", "CNN", "TensorFlow", "Detectron2", "Ollama", "Arduino IDE", "Power BI"],
      highlights: [
        "Developed end-to-end hardware-to-cloud ECG monitoring system with custom AI model analyzing 6 cardiovascular parameters, achieving 95%+ accuracy in anomaly detection",
        "Led research efforts authoring 3 research papers and drafting 3 patents for novel ECG analysis methodologies",
        "Selected to showcase at SRISHTI 2025, Karnataka's premier project expo",
      ],
    },
    {
      name: "NeuroSystem — EEG-Based Thought-to-Target AI System",
      techStack: ["Pandas", "Scikit-Learn", "PyTorch", "CNNs", "MERN Stack", "Flask", "Embedded AI"],
      highlights: [
        "Built an EEG-based AI system for fighter pilots enabling enemy target lock-in within fractions of a second using neural signal processing",
        "Designed custom ML pipelines for neural signal classification",
        "Won 1st Prize at AI Cohort 2025, selected for APF 2025, received ₹50,000 in funding, published a research paper and filed a patent",
      ],
    },
  ],

  skills: {
    languages: ["Python", "C++", "C", "MySQL", "MongoDB", "Scala", "Java"],
    frameworks: ["PyTorch", "TensorFlow", "CNN", "LSTM", "Llama2", "Generative AI (LLMs)", "MERN Stack", "Flask"],
    tools: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Android Studio", "Power BI", "n8n", "Ollama"],
    databases: ["MySQL", "MongoDB"],
    hardware: ["Arduino IDE", "Raspberry Pi", "Jetson Nano", "ESP32", "EEG/ECG Signal Processing", "Embedded ML"],
    concepts: [
      "PyTorch", "Pandas", "Scikit-Learn", "EEG/ECG Signal Processing", "Embedded ML",
      "Active Listening", "Empathy", "Verbal/Non-Verbal Communication", "Group Discussion",
    ],
  },

  awards: [
    {
      title: "Finalist, Manthan 2025",
      organization: "Manthan",
      date: "2025",
      description: "Selected as a finalist, recognized for innovative problem-solving and ideation.",
    },
    {
      title: "Finalist, Vishwakarma Awards 2025",
      organization: "Vishwakarma Awards",
      date: "2025",
      description: "Recognized for outstanding innovation and technical contribution.",
    },
    {
      title: "Top Positions — SRISHTI, SIH, Vyuhatech & IEEE Rapid Innovation Challenge",
      organization: "Multiple",
      date: "2025",
      description: "Achieved top positions across multiple prestigious competitions.",
    },
  ],

  certifications: [],

  publications: [],
};
