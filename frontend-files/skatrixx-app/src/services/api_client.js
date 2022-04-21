import axios from "axios";
export const loggedUser = localStorage.getItem("userId")



export default axios.create({
  baseURL: "https://skaterixx.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});