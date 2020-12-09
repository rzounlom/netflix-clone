import React, { useState, useEffect } from "react";
import { instance, youtube } from "../../axios/axios";
import "./Row.scss";

import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const baseNetflixOriginalMovieImgUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      const response = request.data.results;
      setMovies(response);
      return response;
    };

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const findMovieTrailer = async (title) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: title,
        },
      });
      setTrailerUrl(response.data.items[0].id.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieUrl = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      findMovieTrailer(movie.title || movie.name || movie.original_title);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${baseNetflixOriginalMovieImgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleMovieUrl(movie)}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
