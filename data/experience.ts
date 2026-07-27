import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "1",
    type: "internship",
    role: "Quality Check Intern",
    organization: "Incanus Technologies Pvt. Ltd. (Newton School)",
    organizationUrl: "#",
    location: "Bangalore, India",
    locationType: "onsite",
    startDate: "2025-07",
    endDate: "2025-09",
    current: false,
    description:
      "Completed a 2.5-month internship demonstrating responsibility, sincerity, and eagerness to take on new challenges.",
    highlights: [
      { text: "Actively and thoroughly involved in assigned quality check responsibilities, contributing to internal process improvements" },
      { text: "Demonstrated strong work ethic and professional conduct, earning recognition from leadership for willingness to learn and adapt" },
    ],
    technologies: ["Quality Assurance", "Process Documentation"],
    color: "#3b82f6",
  },
  {
    id: "2",
    type: "education",
    role: "Bachelor of Engineering — Computer Science & Data Science",
    organization: "CMR Institute of Technology",
    location: "Bengaluru, India",
    locationType: "onsite",
    startDate: "2024-08",
    endDate: "2028-05",
    current: true,
    description:
      "Pursuing a Bachelor of Engineering with a focus on AI, machine learning, and intelligent systems — building award-winning hardware/AI projects (Samridh, BioRythm, NeuroSystem) alongside coursework.",
    highlights: [
      { text: "CGPA: 8.0 / 10.0", metric: "8.0 GPA" },
      { text: "Finalist: Manthan 2025, Vishwakarma Awards 2025" },
      { text: "Top positions across SRISHTI, Smart India Hackathon (SIH), Vyuhatech & IEEE Rapid Innovation Challenge" },
    ],
    technologies: ["Python", "C++", "C", "MySQL", "MongoDB", "Machine Learning", "Embedded AI"],
    color: "#ec4899",
  },
];

export const getCurrentExperiences = (): Experience[] =>
  experiences.filter((e) => e.current);

export const getPastExperiences = (): Experience[] =>
  experiences.filter((e) => !e.current);
