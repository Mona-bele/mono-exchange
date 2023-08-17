import axios from "axios";
import { env } from "../env";

export const httpRequest = axios.create({
  baseURL: env.EXCHANGES_API_URL
})