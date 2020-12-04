import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import "./Row.scss";

const Row = ({ title, fetchUrl }) => {
  const baseNetflixOriginalMovieImgUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);
  const listMovies = movies.map((movie) => (
    <img
      className="row__poster"
      key={movie.id}
      src={`${baseNetflixOriginalMovieImgUrl}${movie.poster_path}`}
      alt={movie.name}
    ></img>
  ));
  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">{listMovies}</div>
    </div>
  );
};

export default Row;
