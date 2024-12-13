const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const HTTPS_REQUESTS = {
    people: `${BASE_URL}/api/people`,
    films: `${BASE_URL}/api/films`,
    species: `${BASE_URL}/api/species/`,
    starships: `${BASE_URL}/api/starships`,
    planets: `${BASE_URL}/api/planets`,
    vehicles: `${BASE_URL}/api/vehicles`,
}

export {
    HTTPS_REQUESTS
}