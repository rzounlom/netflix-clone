import Banner from "../components/banner";
import Head from "next/head";
import Navbar from "../components/navbar";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos } from "../lib/videos";
import { getVideos } from "../lib/videos";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar username="rzounlom@gmail.com" />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          {" "}
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
