import { HTTPS_REQUESTS } from "@/config/index.config"
import AxiosInstance from "../AxiosInstance"

function getSpeciesListDetails(id: number | string){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.species}/${id}`)
    return res
}
export {
    getSpeciesListDetails
}