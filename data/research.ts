import type { Research } from "@/types/research";

export const researchPapers: Research[] = [
  {
    id: "1",
    title:
      "Adaptive Cross-Modal Attention for Robust Autonomous Navigation in Unstructured Environments",
    abstract:
      "We present AdaptFuse, a novel cross-modal attention mechanism for fusing LiDAR point clouds and RGB-D images in autonomous robot navigation. Our approach dynamically weights modality contributions based on scene context, achieving state-of-the-art obstacle detection performance on the KITTI and nuScenes benchmarks while maintaining real-time inference at 28 FPS on an NVIDIA Jetson AGX.",
    objectives: [
      "Design a lightweight cross-modal attention mechanism suitable for edge deployment",
      "Achieve real-time inference (>25 FPS) on embedded GPU hardware",
      "Outperform single-modality baselines by ≥15% on standard navigation benchmarks",
      "Demonstrate robustness to sensor degradation (rain, fog, partial occlusion)",
    ],
    methodology:
      "We encode LiDAR point clouds using a PointNet++ backbone and RGB-D images using a MobileViT-Small encoder. A cross-modal transformer attention block computes mutual attention scores between modality feature tokens, with a learned confidence gate that suppresses unreliable modality contributions. The fused representation is decoded via a lightweight BEV (Bird's Eye View) detection head. The model is trained on KITTI, nuScenes, and our custom indoor dataset with augmented sensor degradation scenarios.",
    results: [
      "18.3% improvement in obstacle detection mAP over best single-modality baseline",
      "28 FPS real-time inference on NVIDIA Jetson AGX Xavier",
      "Robust performance under simulated rain (up to 50mm/hr) and fog (visibility >10m)",
      "3.2× reduction in model parameters vs. TransFuser baseline with only 1.4% accuracy drop",
    ],
    conclusion:
      "AdaptFuse demonstrates that adaptive cross-modal attention can significantly improve navigation robustness while remaining computationally tractable for edge deployment. The confidence-gated attention mechanism proves particularly valuable under sensor degradation scenarios common in real-world deployment.",
    authors: [
      { name: "Tanmay", affiliation: "Your University", isMainAuthor: true },
      { name: "Prof. Advisor Name", affiliation: "Your University" },
    ],
    venue: "IEEE International Conference on Robotics and Automation",
    venueShort: "ICRA 2025",
    year: 2025,
    month: 5,
    status: "under-review",
    domain: "Robotics / Computer Vision",
    keywords: ["sensor fusion", "autonomous navigation", "cross-modal attention", "LiDAR", "edge AI"],
  },
  {
    id: "2",
    title:
      "FedEdge: Privacy-Preserving Federated Anomaly Detection for Industrial IoT Networks",
    abstract:
      "FedEdge introduces a federated learning framework for anomaly detection across Industrial IoT (IIoT) edge nodes, enabling collective model improvement without centralizing sensitive sensor data. Using differential privacy guarantees and an adaptive aggregation protocol, FedEdge achieves 99.1% detection accuracy on the SKAB benchmark while providing ε=1.2 differential privacy guarantees.",
    objectives: [
      "Enable collaborative model training across IIoT nodes without raw data exchange",
      "Provide formal differential privacy guarantees (ε ≤ 2.0)",
      "Maintain >99% anomaly detection accuracy across heterogeneous device capabilities",
      "Operate on resource-constrained microcontrollers (≤512KB RAM)",
    ],
    methodology:
      "Each edge node trains a local LSTM autoencoder on its sensor time-series. Gradient updates are privatized using the Gaussian mechanism before transmission to the aggregation server. A novel adaptive aggregation scheme weights client updates by data quality scores computed from local validation performance, mitigating the effect of Byzantine clients. The server uses FedAvg with momentum for stable convergence.",
    results: [
      "99.1% anomaly detection accuracy on SKAB industrial benchmark",
      "ε=1.2 differential privacy guarantee with δ=10⁻⁵",
      "Converged in 42 communication rounds vs. 120 for standard FedAvg",
      "42KB model footprint deployable on ESP32 (320KB RAM)",
    ],
    conclusion:
      "FedEdge demonstrates that strong privacy guarantees and high detection accuracy are not mutually exclusive in IIoT federated learning. The adaptive aggregation scheme substantially accelerates convergence, making FedEdge practical for real industrial deployments with privacy constraints.",
    authors: [
      { name: "Tanmay", affiliation: "Your University", isMainAuthor: true },
      { name: "Co-Author Name", affiliation: "Your University" },
    ],
    venue: "IEEE Internet of Things Journal",
    venueShort: "IEEE IoT-J 2024",
    year: 2024,
    month: 10,
    status: "preprint",
    domain: "IoT / Federated Learning",
    keywords: ["federated learning", "anomaly detection", "differential privacy", "IIoT", "TinyML"],
    arxivId: "2410.XXXXX",
  },
];

export const getPublishedResearch = (): Research[] =>
  researchPapers.filter((r) => r.status === "published" || r.status === "under-review" || r.status === "preprint");
