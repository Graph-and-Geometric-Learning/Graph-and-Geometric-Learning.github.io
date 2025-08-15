"use client";

import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import Image from "next/image";
// import { Image } from "@heroui/image";

import { title, subtitle } from "@/components/primitives";
import { newsList, News } from "@/config/news"
import { remark } from 'remark';
import html from 'remark-html';

function ResearchDirection({ title, image }: { title: string; image: string }) {
  return (
    <Card
      isPressable
      className="col-span-1 p-0"
      onClick={() => {
        window.location.href = `/publications?tag=${title}`;
      }}
    >
      <CardBody className="relative aspect-square">
        <Image
          fill
          alt={title}
          src={image}
          style={{
            objectFit: "cover",
          }}
        />
      </CardBody>
      <CardFooter className="justify-between h-16">
        <h4 className="font-medium text-large">{title}</h4>
      </CardFooter>
    </Card>
  );
}

function ExpandNews(news: News, index: number) {
  // Custom renderer for <a> tags
  function renderHtmlWithCustomLinks(htmlString: string) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: htmlString.replace(
            /<a /g,
            '<a style="color:#0070f3;text-decoration;" '
          ),
        }}
      />
    );
  }

  const htmlContent = remark().use(html).processSync(news.content).toString();

  return (
    <li key={index}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <span style={{ width: '100px', flexShrink: 0 }}>
          <em>{news.date}</em>
        </span>
        <span style={{ marginLeft: '1em' }}>
          {renderHtmlWithCustomLinks(htmlContent)}
        </span>
      </div>
    </li>
  );
}

export default function Home() {
  return (
    <>
      <div className="p-4">
        <h1 className={subtitle()}>🔥 News</h1>
        <ScrollShadow className="w-full h-[180px] px-8">
          <ul>
            {newsList.map((news, index) => ExpandNews(news, index))}

	  {/*
            <li>
              Rex gave a tutorial on Machine Learning in Network Science at{" "}
              <Link href="https://netsci2024.com/en/schools">NetSci 2024</Link>
            </li>
            <li>
              Rex gave a tutorial on{" "}
              <Link href="https://www2024.thewebconf.org/docs/tutorial-slides/text-attributed-graph-representation-learning.pdf">
                Text-Attributed Graph Representation Learning: Methods,
                Applications, and Challenges
              </Link>{" "}
              at WebConf 2024
            </li>
            <li>
              Rex gave a keynote on Foundation Models and Geometry for Science
              via Relational Reasoning at WebConf 2024{" "}
              <Link href="https://www.www24gfm.com/">
                Graph Foundation Models Workshop
              </Link>
            </li>
            <li>
              Rex gave a seminar talk on Self-supervised learning and foundation
              models at{" "}
              <Link href="https://www.utrgv.edu/">
                University of Taxas, Rio Grande Valley
              </Link>
              . Date: April 25, 2024
            </li>
            <li>Rex awarded the Amazon Research Award 2024</li>
            <li>
              Rex gave a keynote at the{" "}
              <Link href="https://datascience.uchicago.edu/events/gnns-for-the-sciences-from-theory-to-practice/">
                GNNs for the Sciences: from Theory to Practice Workshop
              </Link>
              , University
            </li>
            <li>
              Rex gave a talk on multimodal graph models at AWS. Date: Jan 11,
              2024
            </li> */}
          </ul>
        </ScrollShadow>
      </div>

      <div className="p-4">
        <h1 className={title()}>Vision</h1>
        <div className="grid grid-cols-4 grid-rows-1">
          <div className="col-span-2 px-8">
            <p className="my-4">
              We are a group of data-driven machine learning enthusiasts who are
              primarily interested in building unified approaches to integrate
              and learn from complex real-world data. Beyond just text and
              images, we also build novel deep learning models that consider
              graphs, time series, geometry and tabular data, and use them to
              solve a wide array of applications in domains such as biology,
              medicine, chemistry, physics, neuroscience, social networks,
              science of science and supply chain.
            </p>
            <p>
              Motivated by real-world use cases, we focus on efficient and
              scalable techniques that combine relational reasoning, multimodal
              learning, geometric deep learning and foundation models.
              Furthermore, we are actively doing research in trustworthy deep
              learning to allow safe, transparent and reliable deployment of
              such models.
            </p>
          </div>

          <div className="relative col-span-2">
            <Image
              fill
              alt="word cloud"
              src="/word_cloud.png"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 p-8">
        <ResearchDirection
          image="/graph_learning.png"
          title="Geometric and Graph Learning"
        />
        <ResearchDirection
          image="/multimodal.png"
          title="Multimodal Foundation Model"
        />
        <ResearchDirection image="/trustworthy.png" title="Trustworthy AI" />
        <ResearchDirection image="/application.png" title="Applications" />
      </div>
    </>
  );
}
