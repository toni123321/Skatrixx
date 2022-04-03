import axios from "axios";

//export const loggedUser = '622f56c05648481f811105cf'
export const loggedUser = '62458d16b9cd40e7a1e56728'

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});