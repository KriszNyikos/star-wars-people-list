import { DropDownOption } from "@/interfaces/DropDownSelectorProps";
import { getIdFromUrl } from "../utils/idRegxHelper";

interface Film {
  title: string;
  url: string;
}

export const getFilmDropDownOptionList = async (): Promise<
  DropDownOption[]
> => {
  return await fetch("https://swapi.dev/api/films")
    .then((res) => res.json())
    .then((data) =>
      data.results.map((film: Film) => {
        return {
          name: film.title,
          id: getIdFromUrl(film.url),
        };
      })
    );
};
