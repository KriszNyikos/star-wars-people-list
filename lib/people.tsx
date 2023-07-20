import { mapApiResponseTocharacterListData } from "@/interfaces/CharacterListData";
import {
  PeopleApiResponse,
  PeopleFromAPI,
} from "@/interfaces/PeopleApiResponse";
import { PeopleServerProps } from "@/interfaces/PeopleServerProps";

export interface ServerQueryParams {
  page: string;
  search: string | null;
  planet: string | null;
  film: string | null;
}

const filterPeople = (
  people: PeopleFromAPI[],
  planet: string | null,
  film: string | null
) => {
  return people.filter((person: PeopleFromAPI) => {
    if (
      planet &&
      person.homeworld !== `https://swapi.dev/api/planets/${planet}/`
    ) {
      return false;
    }
    if (
      film &&
      !person.films.includes(`https://swapi.dev/api/films/${film}/`)
    ) {
      return false;
    }
    return true;
  });
};

export const getPeopleList = async ({
  page,
  search,
  planet,
  film,
}: ServerQueryParams): Promise<PeopleServerProps> => {
  let url = "";
  if (search) {
    url = `https://swapi.dev/api/people?search=${search}&page=${page}`;
  } else {
    url = `https://swapi.dev/api/people?page=${page}`;
  }

  const response = await fetch(url);

  const errorCode = response.ok ? false : response.status;

  if (response.ok === true) {
    const characterListData = response.ok
      ? await response
          .json()
          .then(({ results, count }: PeopleApiResponse) => {
            return { results: filterPeople(results, planet, film), count }; // Here filter the getted response from API
          })
          .then(mapApiResponseTocharacterListData)
      : undefined;

    return {
      errorCode,
      characterListData,
      currentPage: parseInt(page) || 1,
      search: search || null,
    };
  } else {
    return {
      errorCode: response.status,
      currentPage: parseInt(page) || 1,
      search: search || null,
    };
  }
};
