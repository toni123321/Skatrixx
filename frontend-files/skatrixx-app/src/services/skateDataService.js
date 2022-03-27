import http from "./api_client"

const getAll = () => {
    return http.get("/skateDatas")
}

const getLastStat = () => {
    return http.get("/skateDatas/lastRecord")
}

export default {
    getAll,
    getLastStat
}