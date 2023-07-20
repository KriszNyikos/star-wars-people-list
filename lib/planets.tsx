import { getIdFromUrl } from "./idRegx"

export const getPlanetDropDownList = async () =>{
    return await fetch('https://swapi.dev/api/planets')
    .then(res => res.json())
    .then(data => data.results.map((planet: any) => {
        return {
            name: planet.name,
            id: getIdFromUrl(planet.url)
        }
    }))
}
