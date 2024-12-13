import { HTTPS_REQUESTS } from "@/config/index.config";
import AxiosInstance from "../AxiosInstance";

function getFilmsList(name: string | any = '', page?:number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.films}?page=${page}&search=${name}`)
    return res
}
function getFilmDetailsById(id: string | any = ''){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.films}/${id}`)
    return res
}
export {
    getFilmsList,
    getFilmDetailsById
}