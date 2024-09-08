import { title, subtitle } from "@/components/primitives";
import { Placeholder } from "@/components/placeholder";
import { peopleList, PeopleList, Person } from "@/config/people";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

import Image from "next/image";
// import { Image } from "@nextui-org/image";



export default function PeoplePage() {
  return (
    <div className="text-left">
      <ExpandPeople text={"Director"} people={peopleList.director} />
      <Divider />

      <ExpandPeople text={"Postdocs"} people={peopleList.postdocs} />
      <Divider />

      <ExpandPeople text={"PhD Students"} people={peopleList.phds} />
      <Divider />

      <OtherExpandPerson text={"Master/Undergrad Students"} people={peopleList.masters_and_undergrad} />

    </div>
  );
}


function ExpandPeople({text, people} : {text: string, people: Person[]}) 

{
  return (
    <div className="p-8">
      <h1 className={title()}>{text}</h1>
    <ul>
      {people.map((person) => ExpandPerson(person))}
    </ul>
    </div>
  )

}


function ExpandPerson(person: Person) {
  return (
      <li key={person.name}>
        <PersonCard {...person} />
      </li>
  )
}

export function PersonCard(person: Person) {
  return (
    <Card className="py-4 border-none bg-transparent" shadow="none">
      <CardBody>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="relative h-64">
              <Image 
                src={person.photo || "/favicon.ico"}
                alt={person.name}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          <div className="col-span-3 flex">
            <div className="flex flex-col">
              <h2 className={subtitle()}>{person.name}</h2>
              <p className="text-justify mb-4">{person.intro}</p>
              {person.homepage && <Link href={person.homepage}>Homepage</Link>}
            </div>
          </div>

        </div>
      </CardBody>
    </Card>
  )

}

function OtherExpandPerson(person: Person) {
  return (
      <li key={person.name}>
        <OtherPersonCard {...person} />
      </li>
  )
}

export function OtherPersonCard(person: Person) {
  return (
    <Card className="py-4 border-none" shadow="none">
      <CardBody>
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
              <p className="text-justify"><strong>{person.name}:</strong>  {person.position}</p>
            </div>
        </div>
            
      </CardBody>
    </Card>
  )
}
