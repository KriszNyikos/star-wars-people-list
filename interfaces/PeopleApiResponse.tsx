// It represents the shape of the data that we get from the API
// Some data ara skipped from the real response because it's not needed for this project

export interface PeopleApiResponse {
  count: number;
  results: PeopleFromAPI[];
}

export interface PeopleFromAPI {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  homeworld: string;
  films: string[];
  url: string;
}
