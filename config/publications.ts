export enum Tag {
    GraphLearning = "Graph Learning",
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
    }
]