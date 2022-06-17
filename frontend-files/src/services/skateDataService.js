import http from "./api_client"

const getAll = () => {
    return http.get("/skateDatas")
}

const getLastPerformance = () => {
    return http.get("/skateDatas/getLastPerformance")
}

export default {
    getAll,
    getLastPerformance
}