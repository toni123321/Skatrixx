import http from "./api_client"

const getAll = () => {
    return http.get("/skateDatas")
}

export default {
    getAll
}