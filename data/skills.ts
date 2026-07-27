import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  // AI / ML
  { id: "pytorch", name: "PyTorch", category: "ai-ml", proficiency: 90, icon: "SiPytorch", color: "#EE4C2C", featured: true },
  { id: "tensorflow", name: "TensorFlow", category: "ai-ml", proficiency: 88, icon: "SiTensorflow", color: "#FF6F00", featured: true },
  { id: "sklearn", name: "Scikit-Learn", category: "ai-ml", proficiency: 85, icon: "SiScikitlearn", color: "#F7931E", featured: true },
  { id: "pandas", name: "Pandas", category: "ai-ml", proficiency: 85, icon: "SiPandas", color: "#150458" },
  { id: "cnn", name: "CNNs", category: "ai-ml", proficiency: 88, icon: "BiLink", color: "#8b5cf6", featured: true },
  { id: "lstm", name: "LSTM", category: "ai-ml", proficiency: 75, icon: "BiLink", color: "#3b82f6" },
  { id: "llama2", name: "Llama2", category: "ai-ml", proficiency: 72, icon: "SiMeta", color: "#0668E1" },
  { id: "genai", name: "Generative AI (LLMs)", category: "ai-ml", proficiency: 78, icon: "SiOpenai", color: "#10a37f" },
  { id: "ollama", name: "Ollama", category: "ai-ml", proficiency: 70, icon: "BiLink", color: "#000000" },
  { id: "detectron2", name: "Detectron2", category: "computer-vision", proficiency: 70, icon: "BiLink", color: "#5C3EE8" },

  // Programming Languages
  { id: "python", name: "Python", category: "programming", proficiency: 95, icon: "SiPython", color: "#3776AB", featured: true },
  { id: "cpp", name: "C++", category: "programming", proficiency: 82, icon: "SiCplusplus", color: "#00599C", featured: true },
  { id: "c", name: "C", category: "programming", proficiency: 80, icon: "SiC", color: "#A8B9CC" },
  { id: "java", name: "Java", category: "programming", proficiency: 68, icon: "SiJava", color: "#007396" },
  { id: "scala", name: "Scala", category: "programming", proficiency: 55, icon: "SiScala", color: "#DC322F" },

  // Frameworks
  { id: "mern", name: "MERN Stack", category: "frameworks", proficiency: 80, icon: "SiMongodb", color: "#47A248", featured: true },
  { id: "flask", name: "Flask", category: "frameworks", proficiency: 75, icon: "SiFlask", color: "#000000" },
  { id: "n8n", name: "n8n", category: "frameworks", proficiency: 70, icon: "SiN8N", color: "#EA4B71" },

  // Databases
  { id: "mysql", name: "MySQL", category: "databases", proficiency: 78, icon: "SiMysql", color: "#4479A1" },
  { id: "mongodb", name: "MongoDB", category: "databases", proficiency: 78, icon: "SiMongodb", color: "#47A248" },

  // Hardware / Embedded
  { id: "arduino", name: "Arduino IDE", category: "hardware", proficiency: 82, icon: "SiArduino", color: "#00979D", featured: true },
  { id: "eeg-ecg", name: "EEG/ECG Signal Processing", category: "hardware", proficiency: 85, icon: "BiLink", color: "#ef4444", featured: true },
  { id: "embedded-ml", name: "Embedded ML", category: "hardware", proficiency: 82, icon: "BiLink", color: "#f59e0b", featured: true },

  // Tools
  { id: "git", name: "Git", category: "tools", proficiency: 85, icon: "SiGit", color: "#F05032" },
  { id: "github", name: "GitHub", category: "tools", proficiency: 88, icon: "SiGithub", color: "#ffffff" },
  { id: "jupyter", name: "Jupyter Notebook", category: "tools", proficiency: 85, icon: "SiJupyter", color: "#F37626" },
  { id: "vscode", name: "VS Code", category: "tools", proficiency: 90, icon: "SiVisualstudiocode", color: "#007ACC" },
  { id: "android-studio", name: "Android Studio", category: "tools", proficiency: 65, icon: "SiAndroidstudio", color: "#3DDC84" },
  { id: "powerbi", name: "Power BI", category: "tools", proficiency: 72, icon: "SiPowerbi", color: "#F2C811" },

  // Soft Skills
  { id: "active-listening", name: "Active Listening", category: "soft-skills", proficiency: 90, icon: "BiLink", color: "#06b6d4" },
  { id: "empathy", name: "Empathy", category: "soft-skills", proficiency: 88, icon: "BiLink", color: "#8b5cf6" },
  { id: "communication", name: "Verbal / Non-Verbal Communication", category: "soft-skills", proficiency: 85, icon: "BiLink", color: "#3b82f6" },
  { id: "group-discussion", name: "Group Discussion", category: "soft-skills", proficiency: 85, icon: "BiLink", color: "#f59e0b" },
];

export const getSkillsByCategory = (category: string): Skill[] =>
  category === "all" ? skills : skills.filter((s) => s.category === category);

export const getFeaturedSkills = (): Skill[] =>
  skills.filter((s) => s.featured);

export const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "programming", label: "Languages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "hardware", label: "Hardware" },
  { id: "databases", label: "Databases" },
  { id: "tools", label: "Tools" },
  { id: "soft-skills", label: "Soft Skills" },
] as const;
