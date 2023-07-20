
import { mapApiResponseTocharacterListData } from "@/interfaces/CharacterListData";
import { PeopleServerProps } from "@/interfaces/PeopleServerProps";


const filterPeople = (people: [], planet: string, film: string) => {
  return people.filter((person: any) => {
    if (planet && person.homeworld !== `https://swapi.dev/api/planets/${planet}/`) {
      return false;
    }
    if (film && !person.films.includes(`https://swapi.dev/api/films/${film}/`)) {
      return false;
    }
    return true;
  })
}

export const getPeopleList = async ({ page, search, planet, film }: {page: string; search: string, planet: string, film: string}): Promise<PeopleServerProps> => {
  let url = "";
  if (search) {
    url = `https://swapi.dev/api/people?search=${search}&page=${page}`;
  } else {
    url = `https://swapi.dev/api/people?page=${page}`;
  }

  const response = await fetch(url);
  const errorCode = response.ok ? false : response.status;
  const characterListData = response.ok
    ? await response.json().then(({results, count}) => { 
      return { results : filterPeople(results, planet, film), count}; // Here filter the getted response from API
    }).then(mapApiResponseTocharacterListData)
    : undefined;

  return {
    errorCode,
    characterListData,
    currentPage: parseInt(page) || 1,
    search: search || null,
  };
};
