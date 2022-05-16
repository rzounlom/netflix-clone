import videoData from "../data/videos.json";

export const getVideos = () => {
  return videoData.items.map((item) => {
    const id = item.id?.videoId || item.id;
    const snippet = item.snippet;

    return {
      title: snippet?.title,
      imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      id,
      description: snippet.description,
      publishTime: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      statistics: item.statistics ? item.statistics : { viewCount: 0 },
    };
  });
};
