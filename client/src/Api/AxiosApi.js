import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v2/todo"
    : "http://localhost:3000/api/v2/todo";
// console.log(process.env.NODE_ENV);
export default axios.create({
  baseURL,
});
