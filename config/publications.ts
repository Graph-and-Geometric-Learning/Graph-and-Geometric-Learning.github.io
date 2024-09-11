export enum Tag {
  GraphRepresentationLearning = "Graph Representation Learning",
  MultiModalFoundationModel = "Multi-Modal Foundation Model",
  TrustworthyAI = "Trustworthy AI",
  Application = "Application",
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  page: string | null;
  paper: string;
  code: string | null;
  tags: Tag[];
}

export const publications = [
  {
    title: "Learning High-Order Relationships of Brain Regions",
    authors:
      "Weikang Qiu, Huangrui Chu, Selena Wang, Xiaoxiao Li, Yize Zhao, Rex Ying",
    venue: "ICML 2024",
    page: null,
    paper: "https://arxiv.org/abs/2312.02203",
    code: "https://github.com/Graph-and-Geometric-Learning/HyBRiD",
    tags: [Tag.Application, Tag.GraphRepresentationLearning],
    abstract:
      "Traditional methods only focus on pariwise connectivity of brain regions. We proposed a new framework based on information bottleneck that learns high-order relationships of brain regions.",
    impact:
      "The learned high-order relationships achieve SOTA performance on predictive tasks and are demonstrated significantly more effective than traditional pairwise methods.",
  },
  {
    title:
      "D4Explainer: In-distribution explanations of graph neural network via discrete denoising diffusion",
    authors: "Jialin Chen, Shirley Wu, Abhijit Gupta, Rex Ying",
    venue: "NeurIPS 2023",
    page: null,
    paper:
      "https://proceedings.neurips.cc/paper_files/paper/2023/hash/f978c8f3b5f399cae464e85f72e28503-Abstract-Conference.html",
    code: "https://github.com/Graph-and-Geometric-Learning/D4Explainer",
    tags: [Tag.TrustworthyAI],
    abstract:
      "We propose D4Explainer, a novel approach that provides in-distribution GNN explanations for both counterfactual and model-level explanation scenarios.",
    impact:
      "D4Explainer is the first unified framework that combines both counterfactual and model-level explanations. Empirical evaluations on synthetic and real-world datasets demonstrate the state-of-the-art performance achieved by D4Explainer in terms of explanation accuracy, faithfulness, diversity, and robustness.",
  },
  {
    title: "DTGB: A Comprehensive Benchmark for Dynamic Text-Attributed Graphs",
    authors:
      "Jiasheng Zhang, Jialin Chen, Menglin Yang, Aosong Feng, Shuang Liang, Jie Shao, Rex Ying",
    venue: "Arxiv Preprint",
    page: null,
    paper: "https://arxiv.org/abs/2406.12072",
    code: "https://github.com/zjs123/DTGB",
    tags: [Tag.GraphRepresentationLearning],
    abstract:
      "we introduce Dynamic Text-attributed Graph Benchmark (DTGB), a collection of large-scale, time-evolving graphs from diverse domains, with nodes and edges enriched by dynamically changing text attributes and categories.",
    impact:
      "he proposed DTGB fosters research on DyTAGs and their broad applications. It offers a comprehensive benchmark for evaluating and advancing models to handle the interplay between dynamic graph structures and natural language.",
  },
  {
    title:
      "Hypformer: Exploring Efficient Hyperbolic Transformer Fully in Hyperbolic Space",
    authors:
      "Menglin Yang, Harshit Verma, Delvin Ce Zhang, Jiahong Liu, Irwin King, Rex Ying",
    venue: "KDD 2024",
    page: null,
    paper: "https://arxiv.org/abs/2407.01290",
    code: "https://github.com/Graph-and-Geometric-Learning/hyperbolic-transformer/",
    tags: [Tag.MultiModalFoundationModel],
    abstract:
      "Hypformer, a new hyperbolic Transformer based on the Lorentz model of hyperbolic geometry, addresses existing limitations with foundational modules and a linear self-attention mechanism, demonstrating effectiveness and scalability across various datasets.",
    impact:
      "Hypformer represents a significant advancement in the application of hyperbolic geometry to large-scale data representation, enabling the processing of billion-scale graph data and long-sequence inputs with hyperbolic geometry.",
  },
];
