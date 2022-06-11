import axios from "axios";

let baseURL = process.env.LOCAL_BASE_URL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.PRODUCTION_BASE_URL
}

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
})
export const getBaseUrl = baseURL
export const loggedUser = localStorage.getItem("userId")