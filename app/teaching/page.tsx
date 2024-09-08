import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";

export default function TeachingPage() {
  return (
    <div className="flex px-8">
      <ul>
        {courses.map((course) => 
          <li key={course.id}>
            {ExpandCourse(course)}
          </li>
        )}
      </ul>
    </div>
  );
}

function ExpandCourse(course: Course) {
  return (
    <div className="p-8">
      <h1 className={subtitle()}>{course.id}</h1>
      <p>{course.intro}</p>
      <p className="my-4">Course Link:</p>
      <ul className="flex gap-4">
        {course.happens.map((happen) => 
        <li key={happen.year}>
          <Link href={happen.link}>[{happen.year}]</Link>
        </li>
        )}
      </ul>
    </div>
  )
}

interface Course {
  id: string;
  intro: string;
  happens: Happen[];
}

interface Happen {
  year: string,
  link: string
}

const courses: Course[] = [
  {
    "id": "CPSC 483/583",
    "intro": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia odit culpa doloremque enim nostrum laudantium, dolor rem velit. Atque, molestias corporis porro ipsa veritatis maxime earum. Cupiditate commodi pariatur cum.",
    "happens": [
      {
        "year": "2023 Fall",
        "link": "https://graph-and-geometric-learning.github.io/cpsc483-583-website-23fall/",
      },
      {
        "year": "2022 Fall",
        "link": "https://graph-and-geometric-learning.github.io/CPSC483-website/"
      }

    ]
  }
]