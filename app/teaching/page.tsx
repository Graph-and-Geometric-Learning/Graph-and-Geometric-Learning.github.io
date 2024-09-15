import { Link } from "@nextui-org/link";

export default function TeachingPage() {
  return (
    <div className="flex px-8">
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{ExpandCourse(course)}</li>
        ))}
      </ul>
    </div>
  );
}

function ExpandCourse(course: Course) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{course.id}</h1>
      <p>{course.intro}</p>
      <p className="my-4">Course Link:</p>
      <ul className="flex gap-4">
        {course.happens.map((happen) => (
          <li key={happen.year}>
            <Link href={happen.link}>[{happen.year}]</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Course {
  id: string;
  intro: string;
  happens: Happen[];
}

interface Happen {
  year: string;
  link: string;
}

const courses: Course[] = [
  {
    id: "CPSC 483/583",
    intro:
      "This course provides an introduction to machine learning algorithms designed for graph-structured data, such as social networks, knowledge graphs, and molecular structures. The course covers key graph representation learning techniques, such as node embeddings, graph neural networks, deep generative models for graphs, and non-Euclidean embeddings and other practical topics like AutoML and explainability in graph learning. We also explore applications of graph machine learning, showing how to model and apply graph learning techniques to areas such as online recommender systems, knowledge graphs, biological networks, and physical simulations.",
    happens: [
      {
        year: "2024 Fall",
        link: "https://graph-and-geometric-learning.github.io/cpsc483-583-website-24fall/",
      },
      {
        year: "2023 Fall",
        link: "https://graph-and-geometric-learning.github.io/cpsc483-583-website-23fall/",
      },
      {
        year: "2022 Fall",
        link: "https://graph-and-geometric-learning.github.io/CPSC483-website/",
      },
    ],
  },
  {
    id: "CPSC 471/571",
    intro:
      "This course provides an in-depth exploration of the principles and practices required to build reliable, fair, and secure machine learning systems. As machine learning models become more embedded in critical applications, such as healthcare, finance, and autonomous systems, ensuring their trustworthiness is becoming increasingly essential. The course covers key topics including robustness against adversarial attacks, fairness in algorithmic decision-making, model interpretability, and privacy-preserving techniques such as differential privacy, federated learning and machine unlearning.",
    happens: [
      {
        year: "2024 Spring",
        link: "https://graph-and-geometric-learning.github.io/cpsc471-571-website-24spring",
      },
    ],
  },
];
