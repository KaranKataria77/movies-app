import { createContext, Dispatch, RefObject, SetStateAction } from "react";

interface IGenres {
  genres: { [key: number]: string };
  setGenres: Dispatch<SetStateAction<{ [key: number]: string }>>;
  targetElement: RefObject<HTMLDivElement> | null;
}

export const MovieContext = createContext<IGenres>({
  genres: [],
  setGenres: () => {},
  targetElement: null,
});
