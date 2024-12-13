import { HTTPS_REQUESTS } from "@/config/index.config";
import AxiosInstance from "../AxiosInstance";

function getPlanetsList(name: string | any = '', page?:number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.planets}?page=${page}&search=${name}`)
    return res
}
function getPlanetListDetails(id: number | string){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.planets}/${id}`)
    return res
} 
export {
    getPlanetsList,
    getPlanetListDetails
}