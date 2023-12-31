import axios from "axios";

import { httpProvider } from "./httpProvider.ts";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

const httpClient = httpProvider(apiClient);

export default httpClient;
