import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import Image from "next/image";

import { peopleList, Person } from "@/config/people";

// import { Image } from "@heroui/image";

export default function PeoplePage() {
  return (
    <div className="text-left">
      <ExpandPeople people={peopleList.director} text={"Director"} />
      <Divider />

      <ExpandPeople people={peopleList.postdocs} text={"Postdocs"} />
      <Divider />

      <ExpandPeople people={peopleList.phds} text={"PhD Students"} />

      <Divider />
      <ExpandOtherPeople
        people={peopleList.masters_and_undergrad}
        text={"Master/Undergrad Students"}
      />
    </div>
  );
}

function ExpandPeople({ text, people }: { text: string; people: Person[] }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{text}</h1>
      <ul>
        {people.map((person) => (
          <li key={person.name}>
            <PersonCard {...person} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpandOtherPeople({
  text,
  people,
}: {
  text: string;
  people: Person[];
}) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{text}</h1>
      <ul className="list-disc list-inside">
        {people.map((person) => ExpandOtherPerson(person))}
      </ul>
    </div>
  );
}

function ExpandOtherPerson(person: Person) {
  if (person.homepage) {
    return (
      <li key={person.name}>
        <Link href={person.homepage}>{person.name}</Link>
      </li>
    );
  }
  return <li key={person.name}>{person.name}</li>;
}

function PersonCard(person: Person) {
  return (
    <div className="grid grid-cols-3 gap-6 my-8">
      <div className="col-span-1">
        <div className="relative h-64">
          <Image
            fill
            alt={person.name}
            src={person.photo || "/favicon.ico"}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="col-span-2 flex">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold pb-2">{person.name}</h2>
          <p className="text-justify mb-4">{person.intro}</p>
          {person.homepage && <Link href={person.homepage}>🏠 Homepage</Link>}
        </div>
      </div>
    </div>
  );
}
