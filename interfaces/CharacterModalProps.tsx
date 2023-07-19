import { HomeWorld } from "./Homeworld";
  
  export interface CharacterModalProps {
    name: string;
    mass: string;
    height: string;
    birtnYear: string;
    countOfFilms: number;
    homeWorldData?: HomeWorld;
  }

