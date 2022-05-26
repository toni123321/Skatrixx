import http from "./api_client"

const getAll = () => {
    return http.get("/skateGallery")
}

const getById = (id) => {
    return http.get(`/skateGallery/${id}`)
}

const uploadImage = (image) => {
    return http.post("/skateGallery", image)
}

const skateboardImage = {
    getAll,
    getById,
    uploadImage
}

export default skateboardImage
