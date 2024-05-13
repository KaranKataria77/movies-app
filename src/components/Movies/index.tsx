import React from "react";
import "./style.css";
import Card from "./Card";
import Loader from "../Loader";
import { IMovie } from "../../types";

const Movies = ({
  movies,
  year,
  loading,
}: {
  movies: IMovie[];
  year: number;
  loading: boolean;
}) => {
  return (
    <div className="movies-main">
      <h1 className="active-year">{year}</h1>
      <div className="movies">
        {movies &&
          Array.isArray(movies) &&
          movies.length > 0 &&
          movies.map((movie, index) => (
            <Card index={index} movie={movie} key={index} />
          ))}
      </div>
      {loading && (
        <div style={{ paddingTop: "40px" }}>
          <Loader
            additionalStyle={{ width: "80px", height: 30, marginTop: 10 }}
          />
          <Loader
            additionalStyle={{ width: "100%", height: 300, marginTop: 20 }}
          />
        </div>
      )}
    </div>
  );
};

export default Movies;
