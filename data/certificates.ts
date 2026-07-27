import type { Certificate } from "@/types/certificate";

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    issueDate: "2023-04",
    credentialUrl: "https://coursera.org",
    skills: ["Deep Learning", "CNN", "RNN", "Structuring ML Projects"],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "2",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    issueDate: "2023-06",
    expiryDate: "2026-06",
    credentialUrl: "https://credential.net",
    skills: ["TensorFlow", "Computer Vision", "NLP", "Time Series"],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "3",
    title: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    issueDate: "2024-01",
    expiryDate: "2027-01",
    credentialUrl: "https://aws.amazon.com",
    skills: ["AWS SageMaker", "ML Pipelines", "Model Deployment", "MLOps"],
    category: "cloud",
    featured: true,
  },
  {
    id: "4",
    title: "ROS2 Robotics Developer",
    issuer: "The Construct",
    issueDate: "2023-09",
    credentialUrl: "https://theconstructsim.com",
    skills: ["ROS2", "Navigation", "Manipulation", "Simulation"],
    category: "hardware",
    featured: false,
  },
  {
    id: "5",
    title: "Full Stack Open",
    issuer: "University of Helsinki",
    issueDate: "2022-12",
    credentialUrl: "https://fullstackopen.com",
    skills: ["React", "Node.js", "GraphQL", "TypeScript", "Testing"],
    category: "programming",
    featured: false,
  },
];

export const getFeaturedCertificates = (): Certificate[] =>
  certificates.filter((c) => c.featured);
