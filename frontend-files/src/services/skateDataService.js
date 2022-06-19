import http from "./api_client"

const getAll = () => {
    return http.get("/skateDatas")
}

const getLastPerformance = () => {
    return http.get("/skateDatas/getLastPerformance")
}

const processLastPerformance = () => {
    return http.post("skatedatas/processLastPerformance")
}

export default {
    getAll,
    getLastPerformance,
    processLastPerformance
}