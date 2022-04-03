import axios from "axios";

export const loggedUser = '62496cd5528e0cad7bc26777'

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});