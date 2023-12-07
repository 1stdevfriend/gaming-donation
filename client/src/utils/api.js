import axios from "axios";
import { BASE_URL } from "../content_option";

const client = axios.create({
  baseURL: BASE_URL ? BASE_URL : "http://localhost:8086",
});

export default client;
