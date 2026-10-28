import Image, { StaticImageData } from "next/image";
import styles from "./morse.module.css";

export default function Figure({
  image,
  alt,
  caption,
}: {
  image: StaticImageData;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className={`${styles.root} w-full my-8`}>
      <div className={`${styles.figureFrame} p-3 sm:p-5`}>
        <Image src={image} alt={alt} sizes="(min-width: 1152px) 1104px, 100vw" className="h-auto w-full" />
      </div>
      {caption && (
        <figcaption className={`${styles.muted} mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
