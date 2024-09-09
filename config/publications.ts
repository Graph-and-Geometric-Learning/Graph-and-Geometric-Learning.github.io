export enum Tag {
    GraphRepresentationLearning = "Graph Representation Learning",
    TrustworthyAI = "Trustworthy AI",
    Application = "Application",
}

export interface Publication {
    title: string,
    authors: string,
    venue: string,
    page: string | null,
    paper: string,
    code: string | null,
    tag: Tag,
}

export const publications = [
    {
        title: "Learning High-Order Relationships of Brain Regions",
        authors: "Weikang Qiu, Huangrui Chu, Selena Wang, Xiaoxiao Li, Yize Zhao, Rex Ying",
        venue: "ICML 2024",
        page: null,
        paper: "https://arxiv.org/abs/2312.02203",
        code: "https://github.com/Graph-and-Geometric-Learning/HyBRiD",
        tag: Tag.Application,
        abstract: "Traditional methods only focus on pariwise connectivity of brain regions. We proposed a new framework based on information bottleneck that learns high-order relationships of brain regions.",
        impact: "The learned high-order relationships achieve SOTA performance on predictive tasks and are demonstrated significantly more effective than traditional pairwise methods.",
    },
    {
        title: "D4Explainer: In-distribution explanations of graph neural network via discrete denoising diffusion",
        authors: "Jialin Chen, Shirley Wu, Abhijit Gupta, Rex Ying",
        venue: "NeurIPS 2023",
        page: null,
        paper: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/f978c8f3b5f399cae464e85f72e28503-Abstract-Conference.html",
        code: "https://github.com/Graph-and-Geometric-Learning/D4Explainer",
        tag: Tag.TrustworthyAI,
        abstract: "We propose D4Explainer, a novel approach that provides in-distribution GNN explanations for both counterfactual and model-level explanation scenarios.",
        impact: "D4Explainer is the first unified framework that combines both counterfactual and model-level explanations. Empirical evaluations on synthetic and real-world datasets demonstrate the state-of-the-art performance achieved by D4Explainer in terms of explanation accuracy, faithfulness, diversity, and robustness."
    }
]