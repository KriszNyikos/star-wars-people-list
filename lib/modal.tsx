import { CharacterModalProps } from "@/interfaces/CharacterModalProps";
import { HomeWorld } from "@/interfaces/Homeworld";
import { PeopleFromAPI } from "@/interfaces/PeopleApiResponse";

export const mapApiResponseToCharacterModalProps = async (
  character: PeopleFromAPI
):  Promise<CharacterModalProps> => {

  const homeWorldData = await getHomeworldData(character.homeworld)
  return {
    name: character.name,
    birtnYear: character.birth_year,
    height: character.height,
    mass: character.mass,
    homeWorldData,
    countOfFilms: character.films.length,
  };
};

const getHomeworldData = async (homeworldUrl: string): Promise<HomeWorld> => {
  return fetch(homeworldUrl).then((res) => res.json()).then((res) => {
    return {
      name: res.name,
      terrain: res.terrain,
      climate: res.climate,
    };
  });
}