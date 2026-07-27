/**
 * LinkedIn Profile Data
 *
 * LinkedIn's public API is heavily restricted.
 * Update this file to keep the LinkedIn section current.
 * The profile URL links directly to your real profile.
 */

export const linkedinData = {
  name: "Tanmay",
  headline: "AI Engineer & CS Student | Embedded AI · EEG/ECG Signal Processing · Defence Tech",
  location: "Bengaluru, India",
  profileUrl: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
  connectUrl: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
  connectionCount: "500+",
  about:
    "I'm a Computer Science & Data Science student passionate about building intelligent systems at the intersection of AI and hardware — from EEG-based neural interfaces to AI-powered defence helmets. From training deep learning models to shipping hardware-to-cloud pipelines, I care about the full stack.",
  currentRole: {
    title: "B.E. Computer Science & Data Science",
    company: "CMR Institute of Technology",
    duration: "Aug 2024 – Present",
  },
  skills: [
    "Machine Learning",
    "PyTorch",
    "TensorFlow",
    "Python",
    "EEG/ECG Signal Processing",
    "Embedded AI",
    "CNNs",
    "MERN Stack",
    "C++",
  ],
  education: [
    {
      degree: "B.E. Computer Science & Data Science",
      institution: "CMR Institute of Technology",
      years: "2024 – 2028",
    },
  ],
  featured: [
    {
      title: "Samridh — Fighter Pilot Helmet",
      description: "AI-powered helmet for 360° battlefield awareness",
      link: "https://github.com/TANTHETA7",
    },
    {
      title: "BioRythm — New-Gen ECG Device",
      description: "Hardware-to-cloud ECG monitoring at 95%+ anomaly detection accuracy",
      link: "https://github.com/TANTHETA7",
    },
  ],
} as const;
