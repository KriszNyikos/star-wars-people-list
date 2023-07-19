
import { mapApiResponseTocharacterListData } from "@/interfaces/CharacterListData";
import { PeopleServerProps } from "@/interfaces/PeopleServerProps";


export const getPeopleList = async ({ page, search }: {page: string; search: string}): Promise<PeopleServerProps> => {
  let url = "";
  if (search) {
    url = `https://swapi.dev/api/people?search=${search}&page=${page}`;
  } else {
    url = `https://swapi.dev/api/people?page=${page}`;
  }

  const response = await fetch(url);
  const errorCode = response.ok ? false : response.status;
  const characterListData = response.ok
    ? await response.json().then(mapApiResponseTocharacterListData)
    : undefined;

  return {
    errorCode,
    characterListData,
    currentPage: parseInt(page) || 1,
    search: search || null,
  };
};
