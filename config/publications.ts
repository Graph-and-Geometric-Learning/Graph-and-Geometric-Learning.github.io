export enum Tag {
  GeometricAndGraphLearning = "Geometric and Graph Learning",
  MultiModalFoundationModel = "Multi-Modal Foundation Model",
  TrustworthyAI = "Trustworthy AI",
  Applications = "Applications",
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
    title: "Protein-Nucleic Acid Complex Modeling with Frame Averaging Transformer",
    authors: "Tinglin Huang, Zhenqiao Song, Rex Ying, Wengong Jin",
    venue: "NeurIPS, 2024",
    page: null,
    code: "https://github.com/Graph-and-Geometric-Learning/Frame-Averaging-Transformer",
    paper: "https://arxiv.org/abs/2406.09586",
    abstract: "Propose a novel unsupervised aptamer screening paradigm and FAFormer, a frame averaging-based equivariant transformer architecture.",
    impact: "We explore a new angle to conduct aptamer screening in an unsupervised manner by leveraging the strong correlation with the contact map prediction task. Besides, we propose to  integrate Frame Averaging (FA) within each transformer module and develop FAFormer, highlighting a new possibility for geometric encoder design in this domain.",
    tags: [Tag.Applications, Tag.GeometricAndGraphLearning],
  },
  {
    title: "From Similarity to Superiority: Channel Clustering for Time Series Forecasting",
    authors: "Jialin Chen, Jan Eric Lenssen, Aosong Feng, Weihua Hu, Matthias Fey, Leandros Tassiulas, Jure Leskovec, Rex Ying",
    venue: "Arxiv Preprint",
    page: null,
    code: null,
    paper: "https://arxiv.org/pdf/2404.01340",
    abstract: "We developed a novel and adaptable Channel Clustering Module (CCM), which dynamically groups channels characterized by intrinsic similarities and leverages cluster identity, instead of channel identity, to improve time series forecasting performance.",
    impact: "Extensive experiments demonstrate that CCM with mainstream time series forecasting models can (1) boost the performance of time series forecasting by an average margin of 2.4% and 7.2% on long-term and short-term forecasting; (2) enable more accurate zero-shot forecasting; (3) uncover intrinsic time series patterns among channels and improve interpretability of complex time series models.",
    tags: [],
  },
  {
    title: "Learning High-Order Relationships of Brain Regions",
    authors:
      "Weikang Qiu, Huangrui Chu, Selena Wang, Xiaoxiao Li, Yize Zhao, Rex Ying",
    venue: "ICML 2024",
    page: "hybrid",
    paper: "https://arxiv.org/abs/2312.02203",
    code: "https://github.com/Graph-and-Geometric-Learning/HyBRiD",
    tags: [Tag.Applications, Tag.GeometricAndGraphLearning],
    abstract:
      "Traditional methods only focus on pariwise connectivity of brain regions. We proposed a new framework based on information bottleneck that learns high-order relationships of brain regions.",
    impact:
      "The learned high-order relationships achieve SOTA performance on predictive tasks and are demonstrated significantly more effective than traditional pairwise methods.",
  },
  {
    title: "HEART: Learning Better Representation of EHR Data with a Heterogeneous Relation-Aware Transformer",
    authors: "Tinglin Huang, Syed Asad Rizvi, Rohan Krishna Thakur, Vimig Socrates, Meili Gupta, David van Dijk, R. Andrew Taylor, Rex Ying",
    venue: "Journal of Biomedical Informatics 159 (2024): 104741",
    page: null,
    code: null,
    paper: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4904741",
    abstract: "We propose HEART, a pretrained language model for structured EHR data. HEART seamlessly encodes heterogeneous medical entity information through a novel relation embedding module and a multi-level attention scheme.",
    impact: "This novel pretrained framework, featuring a new architecture and dedicated objectives, can inspire future research on foundation models in EHR.",
    tags: [Tag.Applications],
  },
  {
    title: "Online Detection of Anomalies in Temporal Knowledge Graphs with Interpretability",
    authors: "Jiasheng Zhang, Rex Ying, Jie Shao",
    venue: "SIGMOD 2025",
    page: null,
    code: "https://github.com/zjs123/ANoT",
    paper: "https://arxiv.org/abs/2408.00872",
    abstract: "we introduce AnoT, an efficient TKG summarization method tailored for interpretable online anomaly detection in TKGs. AnoT begins by summarizing a TKG into a novel rule graph, enabling flexible inference of complex patterns in TKGs.",
    impact: "The first attempt at strategies to summarize a temporal knowledge graph and first explore how to inductively detect anomalies in TKG.",
    tags: [Tag.GeometricAndGraphLearning],
  },
  {
    title: "DTGB: A Comprehensive Benchmark for Dynamic Text-Attributed Graphs",
    authors:
      "Jiasheng Zhang, Jialin Chen, Menglin Yang, Aosong Feng, Shuang Liang, Jie Shao, Rex Ying",
    venue: "Arxiv Preprint",
    page: null,
    paper: "https://arxiv.org/abs/2406.12072",
    code: "https://github.com/zjs123/DTGB",
    abstract:
      "we introduce Dynamic Text-attributed Graph Benchmark (DTGB), a collection of large-scale, time-evolving graphs from diverse domains, with nodes and edges enriched by dynamically changing text attributes and categories.",
    impact:
      "he proposed DTGB fosters research on DyTAGs and their broad applications. It offers a comprehensive benchmark for evaluating and advancing models to handle the interplay between dynamic graph structures and natural language.",
    tags: [Tag.GeometricAndGraphLearning],
  },
  {
    title:
      "Hypformer: Exploring Efficient Hyperbolic Transformer Fully in Hyperbolic Space",
    authors:
      "Menglin Yang, Harshit Verma, Delvin Ce Zhang, Jiahong Liu, Irwin King, Rex Ying",
    venue: "KDD 2024",
    page: "hypformer",
    paper: "https://arxiv.org/abs/2407.01290",
    code: "https://github.com/Graph-and-Geometric-Learning/hyperbolic-transformer/",
    tags: [Tag.MultiModalFoundationModel],
    abstract:
      "Hypformer, a new hyperbolic Transformer based on the Lorentz model of hyperbolic geometry, addresses existing limitations with foundational modules and a linear self-attention mechanism, demonstrating effectiveness and scalability across various datasets.",
    impact:
      "Hypformer represents a significant advancement in the application of hyperbolic geometry to large-scale data representation, enabling the processing of billion-scale graph data and long-sequence inputs with hyperbolic geometry.",
  }, 
  {
    title: "Explaining Graph Neural Networks via Structure-aware Interaction Index",
    authors: "Ngoc Bui, Hieu Trung Nguyen, Viet Anh Nguyen, Rex Ying",
    venue: "ICML 2024",
    page: "mage",
    code: "https://github.com/ngocbh/MAGE",
    paper: "https://arxiv.org/abs/2405.14352",
    abstract: "We introduces a novel interaction index, namely the Myerson-Taylor interaction index, that internalizes the graph structure into attributing the node values of Shapley value and the interaction values among nodes. We prove that that the Myerson-Taylor index is the unique one that satisfies a system of five natural axioms accounting for graph structure and high-order interaction among nodes. We propose MAGE, a new graph explainer that uses the second-order Myerson-Taylor index to identify the most important motifs influencing the model prediction.",
    impact: "Myerson-Taylor interaction index is the unique generalization of the Shapley and Myerson values to account for both graph structure and high-order interaction among nodes. MAGE is also the first graph explainer that leverages (high-) second-order interaction index to identify multiple explainatory motifs for GNNs.",
    tags: [Tag.TrustworthyAI],
  },
  {
    title: "TempMe: Towards the explainability of temporal graph neural networks via motif discovery",
    authors: "Jialin Chen, Rex Ying",
    venue: "NeurIPS 2023",
    page: null,
    code: "https://github.com/Graph-and-Geometric-Learning/TempME",
    paper: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/5c5bc3553815adb4d1a8a5b8701e41a9-Abstract-Conference.html",
    tags: [Tag.TrustworthyAI],
    abstract: "Derived from the information bottleneck principle, we propose a novel approach, called Temporal Motifs Explainer (TempME), which uncovers the most pivotal temporal motifs guiding the prediction of TGNNs. ",
    impact: "Events in the explanations generated by TempME are verified to be more spatiotemporally correlated than those of existing approaches, with up to 8.21% increase in terms of explanation accuracy across six real-world datasets and up to 22.96% increase in boosting the prediction Average Precision of current TGNNs.",
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
    title: "Learning to Group Auxiliary Datasets for Molecule",
    authors: "Tinglin Huang, Ziniu Hu, Rex Ying",
    venue: "NeurIPS 2023",
    page: null,
    code: "https://github.com/Graph-and-Geometric-Learning/MolGroup",
    paper: "https://arxiv.org/abs/2307.04052",
    abstract: "Propose a routing-based auxiliary dataset grouping method to enhance model performance on molecule datasets with limited labels.",
    impact: "The proposed auxiliary dataset grouping introduces a new paradigm for enhancing model performance on downstream tasks.Besides, our proposed MolGroup is model- agnostic, which can significantly improve model's performance across 11 molecule datasets.",
    tags: [Tag.Applications],
  },
  {
    title: "BatchSampler: Sampling Mini-Batches for Contrastive Learning in Vision, Language, and Graphs",
    authors: "Zhen Yang, Tinglin Huang, Ming Ding, Yuxiao Dong, Rex Ying, Yukuo Cen, Yangliao Geng, Jie Tang",
    venue: "SIGKDD 2023",
    page: null,
    code: "https://github.com/THUDM/BatchSampler",
    paper: "https://arxiv.org/abs/2306.03355v1",
    abstract: "Propose a global negative sampling method for contrastive learning by modeling negative sampling as graph sampling on a proximity graph.",
    impact: "The proposed algorithm is theoretically guaranteed and can consistently improve nine contrastive learning methods across graph, image, and language modalities.",
    tags: []
  },
];
