import { CharacterListData } from "./CharacterListData";

export interface PeopleServerProps {
    errorCode: number | false;
    characterListData?: CharacterListData ; 
    currentPage: number;
    search?: string ;
    planet?: string ;
    film?: string ;
  }
  