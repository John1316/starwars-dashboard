import { HTTPS_REQUESTS } from "@/config/index.config"
import AxiosInstance from "../AxiosInstance"

function getVehicleListDetails(id: number | string){
    const res = AxiosInstance(`get`, `${HTTPS_REQUESTS.vehicles}/${id}`)
    return res
}
export {
    getVehicleListDetails
}