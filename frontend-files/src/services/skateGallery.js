import http from "./api_client"
import { loggedUser } from './api_client';

const getAll = () => {
    return http.get("/skateGallery")
}

const getAllByUserId = () => {
    return http.get(`/skateGallery?user_id=${loggedUser}`)
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
