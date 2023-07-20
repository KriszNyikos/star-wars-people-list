import { getIdFromUrl } from "./idRegx"

export const getFilmDrowDownList = async () =>{
    return await fetch('https://swapi.dev/api/films')
    .then(res => res.json())
    .then(data => data.results.map((film: any) => {
        return {
            name: film.title,
            id: getIdFromUrl(film.url)
        }
    }))
}


