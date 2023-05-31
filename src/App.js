import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";



const App = () => {
  const API_URL = "https://www.omdbapi.com?apikey=cd2eddbb";
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search);
  };

  const searchByEnterHandler = (e)=>{
    if(e.key==="Enter")
    searchMovies(search);
  }


  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies"
          onKeyDown={searchByEnterHandler}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No movies found</h1>
        </div>
      )}
    </div>
  );
};

export default App;