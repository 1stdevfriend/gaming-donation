import axios from "axios";
import { BASE_URL } from "../content_option";

const client = axios.create({
  baseURL: BASE_URL ? BASE_URL : "https://api.xhunter.in",
});

export default client;
