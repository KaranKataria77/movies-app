import React, { useMemo, memo } from "react";
import "./style.css";
import Loader from "../Loader";
import { FaSearch } from "react-icons/fa";

const Header = ({
  genres,
  activeGenres,
  handleGenreChange,
  handleInputChange,
}: {
  genres: { [key: number]: string };
  activeGenres: number[];
  handleGenreChange: (genre: number) => void;
  handleInputChange: (val: string) => void;
}) => {
  const genresKey = useMemo(() => Object.keys(genres), [genres]);
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">MOVIEFIX</h1>
        <div className="header-search">
          <input
            placeholder="Search by movie, actor, director etc"
            type="text"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
          />
          <FaSearch />
        </div>
      </div>
      <div className="header-genres">
        {genresKey.map((genre, index) => (
          <button
            key={index}
            className={
              activeGenres.includes(Number(genre))
                ? "genre-btn genre-btn-active"
                : "genre-btn"
            }
            onClick={() => handleGenreChange(Number(genre))}
          >
            {genres[Number(genre)] as string}
          </button>
        ))}
      </div>
      {genresKey.length <= 0 && (
        <Loader additionalStyle={{ width: "100%", height: 40, margin: 0 }} />
      )}
    </div>
  );
};

export default memo(Header);
