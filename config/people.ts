export type PeopleList = typeof peopleList;

export interface Person {
  name: string;
  intro: string | null;
  homepage: string | null;
  photo: string | null;
}

export const peopleList = {
  director: [
    {
      name: "Rex Ying",
      intro:
        "We are a group of data-driven machine learning enthusiasts who are primarily interested in building unified approaches to integrate and learn from complex real-world data. Beyond just text and images, we also build novel deep learning models that consider graphs, time series, geometry and tabular data, and use them to solve a wide array of applications in domains such as biology, medicine, chemistry, physics, neuroscience, social networks, science of science and supply chain.  Motivated by real-world use cases, we focus on efficient and scalable techniques that combine relational reasoning, multimodal learning, geometric deep learning and foundation models. Furthermore, we are actively doing research in trustworthy deep learning to allow safe, transparent and reliable deployment of such models.",
      homepage: "https://cs.stanford.edu/~rexy/",
      photo: "/people/rex.png",
    },
  ],

  postdocs: [
    {
      name: "Menglin Yang",
      intro:
        "Geometry has always been palying an instrumental role driving scientific discovery. In the era of foundation models and LLM, geometry helps us understand the underlying structures in data, enabling better data perception, modeling, and reasoning. My current research focuses on hyperbolic machine learning methods and their applications, with a particular interest in large language models (LLM), Transformers, recommendation systems, and AI for Science (AI4SCI).",
      homepage: "https://yangmenglin.site/",
      photo: "/people/menglin.jpg",
    },
  ],

  phds: [
    {
      name: "Borui Wang",
      intro: "I am a final-year CS Ph.D. Student working on large language models, natural language processing and machine learning. My main research directions are in large language models, LLM-powered reinforcement learning, knowledge and logical reasoning, neuro-symbolic reasoning, graph neural networks, multimodal language grounding, and applications of LLMs and deep learning in quantitative finance and financial technology.",
      homepage: "https://borui-wang.github.io/",
      photo: "/people/borui.jpg",
    },
    {
      name: "Tinglin Huang",
      intro:
        "My research interests revolve around computational biology, including macromolecule modeling and geometric deep learning on 3D molecular structure.",
      homepage: "https://huangtinglin.github.io/",
      photo: "/people/tinglin.png",
    },
    {
      name: "Jialin Chen",
      intro:
        "My research focuses on advancing multimodal learning techniques to seamlessly integrate heterogeneous data modalities, with a focus on leveraging linguistic information to enhance graph representation learning. I also explore cutting-edge approaches to develop robust graph foundation models and scalable pretraining strategies, pushing the boundaries of AI’s ability to reason over complex and structured data. Alongside these directions, I’m also committed to advancing Trustworthy AI that aims to address the explainability and reliability concerns associated with large models (e.g., LLMs) and real-world applications.",
      homepage: "https://cather-chen.github.io/",
      photo: "/people/jialin.jpg",
    },
    {
      name: "Weikang Qiu",
      intro:
        "Weikang Qiu is a third-year computer science Ph.D. student at Yale University, advised by Prof. Rex Ying. He previously obtained his B.S. degree in Zhejiang University, advised by Prof. Jake Zhao. He is interested in the intersection of machine learning and neuroscience. The ultimate goal of his research is to transform humans - or at least himself - to AIs. This represents a pathway for humanity to transcend its biological limitations (e.g. immortality) and is the only way for modern humans to evolve. In addition to his academic pursuits, Weikang actively contributes to several open-source projects, such as Blender.",
      homepage: "https://github.com/Boltzmachine",
      photo: "/people/weikang.png",
    },
    {
      name: "Ngoc Bui",
      intro:
        "My research interests are machine learning and deep learning with a focus on their responsible use in real-world systems where humans and high measurement uncertainties exist in the loop. Recently, I'm focusing on multimodal large language models and their emerging capabilities in real-world applications.",
      homepage: "https://ngocbh.github.io",
      photo: "/people/ngoc.png",
    },
    {
      name: "Hiren Madhu",
      intro:
        "Ever wonder what secrets lurk within the messy data most of the world holds? Graphs offer a way to untangle this mess, but the key lies in extracting knowledge from this organized chaos. That is where I come in. I'm particularly interested in answering how we can use machine learning methods with limited labeled data to learn representations of these geometric structures (i.e., graphs, simplicial complexes, etc.) and draw insights from them. Imagine unlocking valuable insights without needing mountains of hand-labeled data – the potential excites me! I want to push the boundaries of machine learning with limited labeled data. You might find me playing video games when I'm not tackling these data tangles. Assassin's Creed is my favorite game series.",
      homepage: "https://hirenmadhu.github.io/",
      photo: "/people/hiren.jpeg",
    },
    {
      name: "Yangtian Zhang",
      intro:
        "My research interests are focused on Generative Models, Graph Algorithms, and, more recently, Multi-Modal Foundation Models. Currently, I am exploring innovative solutions for real-world applications and scientific challenges.",
      homepage: "https://zytzrh.github.io/",
      photo: "/people/yangtian.png",
    },
  ],
  masters_and_undergrad: [
    {
      name: "Chuhan Li",
      intro: null,
      homepage: null,
      photo: null,
    },
    {
      name: "Qifan Zhang",
      intro: null,
      homepage: null,
      photo: null,
    },
    {
      name: "Haolan Zuo",
      intro: null,
      homepage: null,
      photo: null,
    },
    {
      name: "Rishabh Anand",
      intro: null,
      homepage: "https://rish-16.github.io/",
      photo: null,
    },
  ],
};
