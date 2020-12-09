import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 1,
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
