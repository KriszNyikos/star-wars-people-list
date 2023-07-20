
import { DropDownOption } from "@/interfaces/DropDownSelectorProps"
import { getIdFromUrl } from "../utils/idRegxHelper"

interface Planet{
    name: string,
    url: string,
}

export const getPlanetDropDownList = async ():Promise<DropDownOption[]> =>{
    return await fetch('https://swapi.dev/api/planets')
    .then(res => res.json())
    .then(data => data.results.map((planet: Planet) => {
        return {
            name: planet.name,
            id: getIdFromUrl(planet.url)
        }
    }))
}
