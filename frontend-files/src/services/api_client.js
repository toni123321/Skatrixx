import axios from "axios";

let baseURL = "http://localhost:3000/"
if (process.env.NODE_ENV === 'production') {
  baseURL = "https://skatrixx.herokuapp.com/" 
}

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
})
export const getBaseUrl = baseURL
export const loggedUser = localStorage.getItem("userId")