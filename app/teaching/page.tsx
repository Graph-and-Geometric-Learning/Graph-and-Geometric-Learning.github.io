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
      "Graph structure emerges in many important domain applications, including but not limited to natural sciences, social networks, language, vision and database. This course offers a guide to model real-world data in the form of graphs and apply deep learning algorithms to perform predictive and generative AI tasks. The first part of the course is an introduction to representation learning for graphs, and covers thoery and algorithms in the field, including distributed node embeddings, graph neural networks, deep graph generative models, knowledge graphs and non-Euclidean embeddings. The second part touches upon topics of recent interests including graph Transformers and graph learning explainability. The second part of the course also focuses on the emerging field of graph foundation models. Additionally, the course covers important applications of graph machine learning. We learn ways to model data as graphs and apply graph learning techniques to problems in domains including online recommender systems, knowledge graphs, biological networks, molecular structure and physical simulations. The course covers many deep techniques (graph neural networks, graph deep generative models) catered to graph structures. The course assumes background in basic deep learning and PyTorch programming. We will provide a brief basic deep learning tutorial in this course.",
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
];
