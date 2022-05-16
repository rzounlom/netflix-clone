import Card from "../card";
import Link from "next/link";
import clsx from "classnames";
import { getVideos } from "../../lib/videos";
import styles from "./section-cards.module.css";

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  const disneyVideos = getVideos();
  console.log({ disneyVideos });
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {disneyVideos.map((video, idx) => {
          return (
            <Link key={idx} href={`/video/${video.id}`}>
              <a>
                <Card
                  id={idx}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
        {/* <Card imgUrl="/static/clifford.webp" size="large" />
        <Card imgUrl="/static/clifford.webp" size="large" />
        <Card imgUrl="/static/clifford.webp" size="large" /> */}
      </div>
    </section>
  );
};

export default SectionCards;
