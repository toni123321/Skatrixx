import axios from "axios";

let baseURL = process.env.REACT_APP_LOCAL_BASE_URL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL
}

console.log(process.env)

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
})
export const getBaseUrl = baseURL
export const loggedUser = localStorage.getItem("userId")