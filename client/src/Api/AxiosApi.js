import axios from "axios";
const baseURL =
  process.env.ENVIRONMENT === "development"
    ? "http://localhost:3000/api/v1/todo"
    : "/api/v1/todo";
export default axios.create({
  baseURL,
});
