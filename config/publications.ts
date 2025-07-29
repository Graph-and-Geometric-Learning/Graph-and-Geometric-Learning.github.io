export enum Tag {
  GeometricAndGraphLearning = "Geometric and Graph Learning",
  MultiModalFoundationModel = "Multi-Modal Foundation Model",
  TrustworthyAI = "Trustworthy AI",
  Applications = "Applications",
  Benchmark = "Benchmark",
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  page: string | null;
  paper: string;
  code: string | null;
  abstract: string;
  impact: string;
  tags: Tag[];
}

export const publications: Publication[] = [
  {
    title: "Mixture-of-Personas Language Models for Population Simulation",
    authors: "Ngoc Bui, Hieu Trung Nguyen, Shantanu Kumar, Julian Theodore, Weikang Qiu, Viet Anh Nguyen, Rex Ying",
    venue: "ACL Findings 2025",
    page: "mop",
    code: "https://github.com/ngocbh/MoP",
    paper: "https://arxiv.org/abs/2504.05019",
    abstract: "We tackle the challenge of simulating diverse human behaviors using large language models (LLMs), which often struggle to reflect the variability across individuals and subpopulations. We introduce Mixture of Personas (MoP), a probabilistic prompting approach that models population diversity through a contextual mixture of persona-based language model agents.",
    impact: "Our work shows that probabilistic persona modeling offers a powerful mechanism for capturing population-level diversity in LLM simulations, opening up new possibilities for social science research, data augmentation.",
    tags: [Tag.Applications],
  },
  {
    title: "Learning Along the Arrow of Time: Hyperbolic Geometry for Backward-Compatible Representation Learning",
    authors: "Ngoc Bui, Menglin Yang, Runjin Chen, Leonardo Neves, Mingxuan Ju, Rex Ying, Neil Shah, Tong Zhao",
    venue: "ICML 2025",
    page: "hbct",
    code: "https://github.com/snap-research/hyperbolic_bct",
    paper: "https://arxiv.org/abs/2506.05826",
    abstract: "We address the challenge of backward compatibility in aligning representation spaces across successive model updates. Our approach leverages hyperbolic geometry, treating time as an intrinsic axis to capture a model’s confidence and evolution. By lifting embeddings into hyperbolic space and constraining new embeddings to remain within the entailment cones of their predecessors, we ensure generational consistency while accommodating uncertainties in the representations.",
    impact: "Our findings demonstrate that hyperbolic geometry provides a natural framework for modeling the temporal evolution of representation spaces, contributing to the development of more robust and adaptable machine learning systems.",
    tags: [Tag.Applications],
  },
  {
    title: "MindLLM: A Subject-Agnostic and Versatile Model for fMRI-to-Text Decoding",
    authors: "Weikang Qiu, Zheng Huang, Haoyu Hu, Aosong Feng, Yujun Yan, Rex Ying",
    venue: "ICML 2025",
    page: "mindllm",
    code: "https://github.com/Graph-and-Geometric-Learning/MindLLM",
    paper: "https://arxiv.org/abs/2502.15786",
    abstract: "We introduce MindLLM, a subject-agnostic and versatile model for fMRI-to-text decoding. MindLLM is equipped with a novel encoder that employs neuroscience-informed attention, and is trained on a large-scale Brain Instruction Tuning (BIT) dataset, enabling it to decode fMRI signals into natural language descriptions across various tasks in a subject-agnostic manner.",
    impact: "MindLLM achieves state-of-the-art performance on a wide range of fMRI-to-text decoding tasks, and demonstrates strong generalization ability to unseen subjects and tasks. This work paves the way for future research on high-quality fMRI-to-text decoding.",
    tags: [Tag.MultiModalFoundationModel],
  },
  {
    title: "Scalable Generation of Spatial Transcriptomics from Histology Images via Whole-Slide Flow Matching",
    authors: "Tinglin Huang, Tianyu Liu, Mehrtash Babadi, Wengong Jin, Rex Ying",
    venue: "ICML, 2025 (Spotlight)",
    page: "stflow",
    code: "https://github.com/Graph-and-Geometric-Learning/STFlow",
    paper: "https://www.arxiv.org/abs/2506.05361",
    abstract: "Propose STFlow, a flow matching generative model to directly infer the spatial gene expression from whole slide images.",
    impact: "We reformulate the original regression task as a generative modeling problem, allowing gene regulation to be integrated across cells. Additionally, the proposed geometry-aware denoiser achieves significantly higher efficiency compared to previous methods.",
    tags: [Tag.Applications, Tag.GeometricAndGraphLearning],
  },
  {
    title: "MTBench: A Multimodal Time Series Benchmark for Temporal Reasoning and Question Answering",
    authors: "Jialin Chen, Aosong Feng, Ziyu Zhao, Juan Garza, Gaukhar Nurbek, Ali Maatouk, Leandros Tassiulas, Yifeng Gao, Rex Ying",
    venue: "",
    page: "mtbench",
    code: "https://github.com/Graph-and-Geometric-Learning/MTBench",
    paper: "https://arxiv.org/abs/2503.16858",
    abstract: "We introduce MTBench, a large-scale benchmark designed to evaluate large language models (LLMs) on time series and text understanding across financial and weather domains. MTBench comprises of paired time-series and textual data, including financial news with corresponding stock price movements and weather reports aligned with historical temperature records.", 
    impact: "We evaluate state-of-the-art LLMs on MTBench, analyzing their effectiveness in modeling the complex relationships between news narratives and temporal patterns. Our findings reveal significant challenges in current models, including difficulties in capturing long-term dependencies, interpreting causality in financial and weather trends, and effectively fusing multimodal information.",
    tags: [Tag.Benchmark, Tag.MultiModalFoundationModel],
  },
  {
    title: "Lorentzian Residual Neural Networks",
    authors: "Neil He, Menglin Yang, Rex Ying",
    venue: "KDD, 2025",
    page: "lresnet",
    code: "https://github.com/Graph-and-Geometric-Learning/LResNet",
    paper: "https://arxiv.org/abs/2412.14695",
    abstract: "We propose LResNet, a new residual connection in the Lorentz formulation of hyperbolic spaces. With provable properties including guaranteed numerical stability and generalizing previous methods, LresNet addresses previous limitations such as runtime inefficiencies, numerical instability, mapping errors, and lack of geometric meaning on the manifolds.",
    impact: "Beyond theoretical guarantees, we demonstrate the improvements achieved by LResNet in building hyperbolic deep learning models, where we conduct extensive experiments to show its superior performance in graph and image modalities across CNNs, GNNs, and graph Transformers.",
    tags: [Tag.GeometricAndGraphLearning, Tag.MultiModalFoundationModel],
  },
  {
    title: "D-Edit: An Item is Worth a Prompt: Versatile Image Editing with Disentangled Control",
    authors:
      "Aosong Feng, Weikang Qiu, Jinbin Bai,Xiao Zhang, Zhen Dong, Kaicheng Zhou, Rex Ying, and Leandros Tassiulas",
    venue: "AAAI 2025",
    page: "dedit",
    paper: "https://arxiv.org/abs/2403.04880",
    code: "https://github.com/collovlabs/d-edit",
    tags: [Tag.Applications],
    abstract:
      "D-Edit is a novel framework for diffusion-based image editing framework that disentangles image-prompt into item-prompt associations, enabling precise and harmonious edits across image, achieving state-of-the-art results in a unified, versatile approach.",
    impact:
      "The proposed method is a unified editing framework that supports image-based, text-based, mask-based editing, and item removal within a single cohesive system.",
  },
  {
    title: "STPath: A Generative Foundation Model for Integrating Spatial Transcriptomics and Whole Slide Images",
    authors: "Tinglin Huang, Tianyu Liu, Mehrtash Babadi, Rex Ying, Wengong Jin",
    venue: "bioRxiv",
    page: "stpath",
    code: "https://github.com/Graph-and-Geometric-Learning/STPath",
    paper: "https://www.biorxiv.org/content/10.1101/2025.04.19.649665v2",
    abstract: "Propose STPath, a generative foundation model that infers spatially resolved gene expression across 38,984 genes and 17 organs directly from WSIs.",
    impact: "STPath is the first model to generalize spatial gene expression prediction across organs and gene panels from WSIs. We believe that our work will contribute to this emerging field and provide a better understanding of pathology practice with the help of spatial transcriptomics.",
    tags: [Tag.Applications, Tag.GeometricAndGraphLearning],
  },
  {
    title: "Protein-Nucleic Acid Complex Modeling with Frame Averaging Transformer",
    authors: "Tinglin Huang, Zhenqiao Song, Rex Ying, Wengong Jin",
    venue: "NeurIPS, 2024",
    page: "faformer",
    code: "https://github.com/Graph-and-Geometric-Learning/Frame-Averaging-Transformer",
    paper: "https://arxiv.org/abs/2406.09586",
    abstract: "Propose a novel unsupervised aptamer screening paradigm and FAFormer, a frame averaging-based equivariant transformer architecture.",
    impact: "We explore a new angle to conduct aptamer screening in an unsupervised manner by leveraging the strong correlation with the contact map prediction task. Besides, we propose to  integrate Frame Averaging (FA) within each transformer module and develop FAFormer, highlighting a new possibility for geometric encoder design in this domain.",
    tags: [Tag.Applications, Tag.GeometricAndGraphLearning],
  },
  {
    title: "From Similarity to Superiority: Channel Clustering for Time Series Forecasting",
    authors: "Jialin Chen, Jan Eric Lenssen, Aosong Feng, Weihua Hu, Matthias Fey, Leandros Tassiulas, Jure Leskovec, Rex Ying",
    venue: "NeurIPS, 2024",
    page: "CCM",
    code: "https://github.com/Graph-and-Geometric-Learning/TimeSeriesCCM",
    paper: "https://arxiv.org/pdf/2404.01340",
    abstract: "We developed a novel and adaptable Channel Clustering Module (CCM), which dynamically groups channels characterized by intrinsic similarities and leverages cluster identity, instead of channel identity, to improve time series forecasting performance.",
    impact: "Extensive experiments demonstrate that CCM with mainstream time series forecasting models can (1) boost the performance of time series forecasting by an average margin of 2.4% and 7.2% on long-term and short-term forecasting; (2) enable more accurate zero-shot forecasting; (3) uncover intrinsic time series patterns among channels and improve interpretability of complex time series models.",
    tags: [Tag.Applications],
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
    page: "heart",
    code: "https://github.com/Graph-and-Geometric-Learning/HEART",
    paper: "https://www.sciencedirect.com/science/article/abs/pii/S153204642400159X",
    abstract: "We propose HEART, a pretrained language model for structured EHR data. HEART seamlessly encodes heterogeneous medical entity information through a novel relation embedding module and a multi-level attention scheme.",
    impact: "This novel pretrained framework, featuring a new architecture and dedicated objectives, can inspire future research on foundation models in EHR.",
    tags: [Tag.Applications],
  },
  {
    title: "Online Detection of Anomalies in Temporal Knowledge Graphs with Interpretability",
    authors: "Jiasheng Zhang, Rex Ying, Jie Shao",
    venue: "SIGMOD 2025",
    page: "anot",
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
    venue: "NeurIPS 2024",
    page: "dtgb",
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
    title: "Thought Propagation: An Analogical Approach to Complex Reasoning with Large Language Models",
    authors: "Junchi Yu, Ran He, Rex Ying",
    venue: "ICLR 2024",
    page: "thought-propagation",
    code: "https://github.com/Samyu0304/thought-propagation",
    paper: "https://arxiv.org/pdf/2310.03965",
    abstract: "Existing prompting approaches for LLM reasoning cannot leverage the insights of solving similar problems and suffer from accumulated errors in multi- step reasoning, due to reasoning from scratch. To address these issues, we propose Thought Propagation (TP), which explores the analogous problems and leverages their solutions to enhance the complex reasoning ability of LLMs",
    impact: "TP is compatible with existing prompting methods, showing plug-and-play generalization and substantial improvements on a wide range of tasks such as Shortest- path Planning, Creative Writing, and LLM - Agent Planning.",
    tags: [],
  },
  {
    title: "TempMe: Towards the explainability of temporal graph neural networks via motif discovery",
    authors: "Jialin Chen, Rex Ying",
    venue: "NeurIPS 2023",
    page: "tempme",
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
    page: "d4explainer",
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
    page: "molgroup",
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
