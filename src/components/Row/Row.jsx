import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import "./Row.scss";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const baseNetflixOriginalMovieImgUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
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

  // const handleMovieUrl = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     const movieDate = movie.release_date
  //       ? movie.release_date.substr(0, 4)
  //       : movie.first_air_date
  //       ? movie.first_air_date.substr(0, 4)
  //       : null;
  //     console.log(movie);
  //     movieTrailer(
  //       movie?.name || movie?.title || movie.original_name || "",
  //       movieDate.toString(),
  //       { id: true, multi: true }
  //     )
  //       .then((url) => {
  //         // //https://www.youtube.com/watch?v=XtMThy8QKqU
  //         console.log(url);
  //         const urlParams = new URLSearchParams(new URL(url).search); //get url params (everything after question mark)
  //         setTrailerUrl(urlParams.get("v"));

  //         console.log(trailerUrl);
  //       })
  //       .catch((error) => {
  //         console.log(trailerUrl);
  //         console.log(error);
  //       });
  //   }
  // };

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
            // onClick={() => handleMovieUrl(movie)}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
