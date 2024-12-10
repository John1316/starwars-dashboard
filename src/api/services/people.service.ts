import { HTTPS_REQUESTS } from "@/config/index.config";
import AxiosInstance from "../AxiosInstance";

function getPeopleList(name: string | any = '', page?:number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.people}?page=${page}&search=${name}`)
    return res
}
function getPeopleListDetails(id: number){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.people}/${id}`)
    return res
}
export {
    getPeopleList,
    getPeopleListDetails
}