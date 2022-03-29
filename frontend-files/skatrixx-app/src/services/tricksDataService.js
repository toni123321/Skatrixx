import http from "./api_client"

const getAllTricks = () => {
    return http.get("/tricks")
}

const getTricksByDifficulty = (difficulty) => {
    return http.get(`/tricks/${difficulty}`)
}

export default {
    getAllTricks,
    getTricksByDifficulty
}