import http from "./api_client"

const getAllTricks = () => {
    return http.get("/tricks")
}

export default {
    getAllTricks
}