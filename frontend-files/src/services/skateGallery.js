import http from "./api_client"

const getAll = () => {
    return http.get("/skateGallery")
}

const getAllByUserId = (user_id) => {
    return http.get(`/skateGallery?user_id=${user_id}`)
}

const getById = (id) => {
    return http.get(`/skateGallery/${id}`)
}

const uploadImage = (image) => {
    return http.post("/skateGallery", image)
}

const skateboardImage = {
    getAll,
    getAllByUserId,
    getById,
    uploadImage
}

export default skateboardImage
