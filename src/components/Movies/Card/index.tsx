import React, { useContext } from "react";
import "./style.css";
import { MovieContext } from "../../../context";
import { IMovie, ICast } from "../../../types";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";

const Card = ({ movie, index }: { movie: IMovie; index: number }) => {
  const { genres, targetElement } = useContext(MovieContext);
  return (
    <div className="container" ref={index === 19 ? targetElement : null}>
      <div className="card">
        <div className="front">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt="movie"
            className="movie-img"
            loading="lazy"
          />
          <div className="movie-rating">
            {movie.vote_average}{" "}
            {[1, 2, 3, 4, 5].map((count: number) =>
              movie.vote_average < count &&
              Math.round(movie.vote_average) === count ? (
                <FaStarHalfAlt
                  key={count}
                  style={{
                    color:
                      Math.round(movie.vote_average) % 5 >= count ||
                      movie.vote_average % 5 === 0
                        ? "#F4C724"
                        : "",
                  }}
                />
              ) : (
                <FaStar
                  key={count}
                  style={{
                    color:
                      Math.floor(movie.vote_average) % 5 >= count ||
                      movie.vote_average % 5 === 0
                        ? "#F4C724"
                        : "",
                  }}
                />
              )
            )}
          </div>
        </div>
        <div className="back">
          <div className="inner-content">
            <p>
              <span className="bld">Genre: </span>{" "}
              {movie?.genre_ids?.map((ids: number, index: number) =>
                index !== movie.genre_ids.length - 1
                  ? `${genres[ids]}, `
                  : `${genres[ids]}`
              )}
            </p>
            <p>
              <span className="bld">Cast: </span>{" "}
              {movie?.cast?.map((actor: ICast, index: number) =>
                index !== movie.cast.length - 1
                  ? `${actor?.name}, `
                  : `${actor?.name}`
              )}
            </p>
            <p>
              <span className="bld">Director: </span> {movie?.crew?.name}
            </p>
            <p>
              <span className="bld">Movie overview: </span>{" "}
              {movie?.overview.length > 50
                ? `${movie?.overview.substring(0, 110)}...`
                : movie?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
