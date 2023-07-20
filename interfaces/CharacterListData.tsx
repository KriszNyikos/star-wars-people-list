import { getIdFromUrl } from "@/utils/idRegxHelper";
import { PeopleApiResponse, PeopleFromAPI } from "./PeopleApiResponse";

export interface CharacterListItem {
  name: string;
  url: string;
  profilePictureUrl: string;
}

export interface CharacterListData {
  totalCount: number;
  characterList: CharacterListItem[];
}

export const mapApiResponseTocharacterListData = (
  apiResponse: PeopleApiResponse
): CharacterListData => {
  return {
    totalCount: apiResponse.count,
    characterList: apiResponse.results.map((character: PeopleFromAPI) => {
      return {
        name: character.name,
        url: character.url,
        profilePictureUrl: `https://picsum.photos/id/${getIdFromUrl(
          character.url
        )}/100/100`,
      };
    }),
  };
};
