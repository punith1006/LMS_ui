import axios from "axios";
import { baseUrl } from "./constants";

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

