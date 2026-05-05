export type EventKind = "Workshop" | "Symposium" | "Tutorial";

export interface Event {
  title: string;
  kind: EventKind;
  venue: string;
  date: string;
  year: number;
  location?: string;
  link: string;
  description?: string;
}

export const eventsList: Event[] = [
  {
    title: "Symposium on Machine Learning across Modalities (SMLM)",
    kind: "Symposium",
    venue: "Yale University",
    date: "April 10, 2026",
    year: 2026,
    location: "Davies Auditorium, New Haven, CT, USA",
    link: "https://smlm.yale.edu/",
    description:
      "A full-day symposium on multi-modal representation learning and foundation models, with keynotes, spotlight talks, posters, and a panel covering vision, text, audio, tactile sensing, and beyond.",
  },
  {
    title:
      "Geometric Space, Architecture and Learning Objective for Large Pre-Trained Models (GALOP)",
    kind: "Workshop",
    venue: "KDD 2026",
    date: "August, 2026",
    year: 2026,
    location: "Jeju, Korea",
    link: "https://hyperboliclearning.github.io/events/kdd2026workshop",
    description:
      "Half-day workshop on geometric representation spaces, geometry-aware architectures, and learning objectives for large pre-trained models — spanning NLP, vision, graph learning, and scientific AI.",
  },
  {
    title:
      "Non-Euclidean Foundation Models and Geometric Learning Workshop (NEGEL)",
    kind: "Workshop",
    venue: "NeurIPS 2025",
    date: "December 7, 2025",
    year: 2025,
    location: "San Diego Convention Center, San Diego, CA, USA",
    link: "https://hyperboliclearning.github.io/events/neurips2025negelworkshop",
    description:
      "Workshop at the intersection of non-Euclidean representation learning and foundation models, with applications in graph analysis, biomedical research, and scientific discovery.",
  },
  {
    title: "Non-Euclidean Foundation Models Tutorial",
    kind: "Tutorial",
    venue: "KDD 2025",
    date: "August, 2025",
    year: 2025,
    link: "https://hyperboliclearning.github.io/events/kdd2025tutorial",
    description:
      "Tutorial on non-Euclidean foundation models at the International Conference on Knowledge Discovery and Data Mining.",
  },
  {
    title: "Workshop on Non-Euclidean Foundation Models (NEGEL)",
    kind: "Workshop",
    venue: "WebConf (WWW) 2025",
    date: "May, 2025",
    year: 2025,
    link: "https://hyperboliclearning.github.io/events/www2025workshop",
    description:
      "Workshop on geometric and non-Euclidean learning for foundation models.",
  },
];
