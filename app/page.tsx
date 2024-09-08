import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import  Image from "next/image";
// import { Image } from "@nextui-org/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Placeholder } from "@/components/placeholder";


function ResearchDirection({ title, image } : {
  title: string,
  image: string,
})
{
  return (
    <Card className="col-span-1 aspect-square py-4" 
    isFooterBlurred
    isPressable
    >
      {/* <CardBody className="relative"> */}
        <Image
          alt={title}
          src={image}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      {/* </CardBody> */}
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 before:rounded-xl rounded-large w-[calc(100%_-_8px)] shadow-small ml-1 justify-center">
        <h4 className="font-medium text-large">{title}</h4>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <>
      <div className="p-4">
      <h1 className={subtitle()}>🔥 News</h1>
      <ScrollShadow className="w-full h-[180px] px-8">
        <ul>
          <li>
              Rex gave a tutorial on Machine Learning in Network Science at <Link href="https://netsci2024.com/en/schools">NetSci 2024</Link>
          </li>
          <li>
              Rex gave a tutorial on <Link href="https://www2024.thewebconf.org/docs/tutorial-slides/text-attributed-graph-representation-learning.pdf">Text-Attributed Graph Representation Learning: Methods, Applications, and Challenges</Link> at WebConf 2024
          </li>
        </ul>
      </ScrollShadow>
      </div>
    
    <div className="p-4">
        <h1 className={title()}>Vision</h1>
      <div className="grid grid-cols-4 grid-rows-1">
        <div className="col-span-2 px-8">
          <p className="my-4">
            We are a group of data-driven machine learning enthusiasts who are primarily interested in building unified approaches to integrate and learn from complex real-world data. Beyond just text and images, we also build novel deep learning models that consider graphs, time series, geometry and tabular data, and use them to solve a wide array of applications in domains such as biology, medicine, chemistry, physics, neuroscience, social networks, science of science and supply chain.
          </p>
          <p>
            Motivated by real-world use cases, we focus on efficient and scalable techniques that combine relational reasoning, multimodal learning, geometric deep learning and foundation models. Furthermore, we are actively doing research in trustworthy deep learning to allow safe, transparent and reliable deployment of such models.
          </p>
        </div>
    
        <div className="relative col-span-2">
          <Image
            alt="Woman listing to music"
            src="https://cs.stanford.edu/~rexy/images/word_cloud.png"
            fill
            style={{
              objectFit: 'contain',
            }} />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4 p-8">
    <ResearchDirection title="Graph Representation Learning" image="/graph_learning.webp" />
    <ResearchDirection title="Multi-Modal Foundation Model" image="/graph_learning.webp" />
    <ResearchDirection title="Trustworthy AI" image="/trustworthy.webp" />
    <ResearchDirection title="Application" image="/application.webp" />
    </div>
    </>
  );
}


