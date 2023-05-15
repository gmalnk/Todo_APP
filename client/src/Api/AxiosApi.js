import axios from "axios";
const baseURL =
  process.env.ENVIRONMENT === "production"
    ? "/api/v1/todo"
    : "http://localhost:3000/api/v1/todo";
export default axios.create({
  baseURL,
});
