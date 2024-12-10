const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const HTTPS_REQUESTS = {
    people: `${BASE_URL}/api/people`,
    films: `${BASE_URL}/api/films`

}

export {
    HTTPS_REQUESTS
}