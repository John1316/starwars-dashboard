import { HTTPS_REQUESTS } from "@/config/index.config";
import AxiosInstance from "../AxiosInstance";

function getStarshipsList(name: string | any = '', page?:number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.starships}?page=${page}&search=${name}`)
    return res
}
function getStarshipListDetails(id: number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.starships}/${id}`)
    return res
} 
export {
    getStarshipsList,
    getStarshipListDetails
}