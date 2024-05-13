export interface IMovie {
  title: string;
  id: number;
  genre_ids: number[];
  cast: ICast[];
  crew: ICrew;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface IYearWiseMovies {
  year: number;
  movies: IMovie[];
}

export interface ICast {
  name: string;
  id: number;
}

export interface ICrew extends ICast {
  job: string;
}
