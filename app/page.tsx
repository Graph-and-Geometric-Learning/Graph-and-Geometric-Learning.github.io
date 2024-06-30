import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import {Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";



import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Placeholder } from "@/components/placeholder";

export default function Home() {
  return (
    <div className="max-w-full gap-2 grid grid-cols-4 grid-rows-2 px-8">
        {/* <div className={`border-4 col-span-4 flex justify-center items-center h-[600px]`}>
            Homepage
        </div> */}
      <Placeholder text="Homepage" col_span={4} height={600} />
      <Placeholder text="Research Direction 1" col_span={1} />
      <Placeholder text="Research Direction 2" col_span={1} />
      <Placeholder text="Research Direction 3" col_span={1} />
      <Placeholder text="Research Direction 4" col_span={1} />
    </div>
  );
}
