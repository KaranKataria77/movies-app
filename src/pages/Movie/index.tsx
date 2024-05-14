/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header";
import Movies from "../../components/Movies";
import axios from "axios";
import { MovieContext } from "../../context";
import Loader from "../../components/Loader";
import { IMovie, ICrew, IYearWiseMovies, ICast } from "../../types";
import useDebounce from "../../customHooks/useDebounce";

const MovieList = () => {
  const [movies, setMovies] = useState<IYearWiseMovies[]>([]);
  const [genres, setGenres] = useState<{ [key: number]: string }>({});
  const [activeYear, setActiveYear] = useState<number>(2012);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeGenres, setActiveGenres] = useState<number[]>([0]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<IYearWiseMovies[]>([]);
  const targetElement = useRef(null);
  const { debouncedValue } = useDebounce(inputValue);

  useEffect(() => {
    fetchGenresList();
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchMoviesWithCast();
  }, [activeYear, activeGenres]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (activeYear < 2024) setActiveYear(activeYear + 1);
        if (targetElement.current) {
          observer.unobserve(targetElement.current);
        }
      }
    });
    if (targetElement.current) {
      observer.observe(targetElement.current);
    }
  }, [movies, targetElement]);

  useEffect(() => {
    filterMovie(debouncedValue);
  }, [debouncedValue]);

  const fetchMoviesWithCast = async () => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&sort_by=popularity.desc&primary_release_year=${activeYear}&page=1&vote_count.gte=100${
        !activeGenres.includes(0) && `&with_genres=${activeGenres.join("|")}`
      }`;
      const data = await axios.get(url);
      const fetchedMovies = data.data.results;
      const casts = await Promise.all(
        data.data.results.map((movie: IMovie) => {
          return axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
          );
        })
      );
      for (let i = 0; i < casts.length; i++) {
        const cast = casts[i].data;
        const movie = fetchedMovies[i];
        movie.cast = cast.cast.length > 2 ? cast.cast.slice(0, 3) : cast.cast;
        movie.crew = cast.crew.filter((ct: ICrew) => ct.job === "Director");
        movie.crew = movie.crew.length > 0 ? movie.crew[0] : [];
        movie.vote_average = (movie.vote_average / 2).toFixed(1);
      }
      setMovies((prevState: IYearWiseMovies[]) => {
        return [
          ...prevState,
          {
            year: activeYear,
            movies: data?.data?.results ?? [],
          },
        ];
      });
    } catch (err) {
      console.log("Error ", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchGenresList = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
    );
    let map: { [key: number]: string } = { 0: "All" };
    response.data.genres.forEach(function (genre: {
      id: number;
      name: string;
    }) {
      map[genre.id] = genre.name;
    });
    setGenres(map ?? {});
  };

  const handleGenreChange = useCallback(
    (genre: number) => {
      let allGenres = [...activeGenres];
      if (allGenres.includes(0) || genre === 0) {
        allGenres = [];
      }
      if (allGenres.includes(genre)) {
        allGenres = allGenres.filter((gen: number) => gen !== genre);
      } else {
        allGenres = [...allGenres, genre];
      }
      if (allGenres.length <= 0) {
        allGenres = [0];
      }
      setMovies([]);
      setActiveYear(2012);
      setActiveGenres(allGenres);
    },
    [activeGenres]
  );

  const handleInputChange = useCallback((val: string) => {
    setInputValue(val);
  }, []);
  const filterMovie = async (searchValue: string) => {
    setLoading(true);
    searchValue = searchValue.toLowerCase();
    const filterMovieBasedOnName = [];
    for (let i = 0; i < movies.length; i++) {
      let yearByMovie = [];
      for (let j = 0; j < movies[i].movies.length; j++) {
        if (
          movies[i].movies[j].title.toLowerCase().includes(searchValue) ||
          movies[i].movies[j].cast.filter((ct: ICast) =>
            ct.name.toLowerCase().includes(searchValue)
          ).length > 0 ||
          movies[i].movies[j].crew.name.toLowerCase().includes(searchValue)
        ) {
          yearByMovie.push(movies[i].movies[j]);
        }
      }
      if (yearByMovie.length > 0)
        filterMovieBasedOnName.push({
          year: movies[i].year,
          movies: yearByMovie,
        });
    }
    setFilteredMovies(filterMovieBasedOnName);
    setLoading(false);
  };
  return (
    <MovieContext.Provider value={{ genres, setGenres, targetElement }}>
      <Header
        genres={genres}
        activeGenres={activeGenres}
        handleGenreChange={handleGenreChange}
        handleInputChange={handleInputChange}
      />
      {movies.length <= 0 ? (
        <div style={{ padding: "20px 20px" }}>
          <Loader
            additionalStyle={{ width: "80px", height: 30, marginTop: 10 }}
          />
          <Loader
            additionalStyle={{ width: "100%", height: 300, marginTop: 20 }}
          />
        </div>
      ) : filteredMovies.length > 0 ? (
        filteredMovies?.map((yearWiseMovie: IYearWiseMovies, index: number) => (
          <Movies
            key={index}
            movies={yearWiseMovie.movies}
            year={yearWiseMovie.year}
            loading={loading}
          />
        ))
      ) : (
        movies?.map((yearWiseMovie: IYearWiseMovies, index: number) => (
          <Movies
            key={index}
            movies={yearWiseMovie.movies}
            year={yearWiseMovie.year}
            loading={loading}
          />
        ))
      )}
    </MovieContext.Provider>
  );
};

export default MovieList;
