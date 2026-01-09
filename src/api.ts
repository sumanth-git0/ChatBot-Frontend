// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export default api;



import axios from "axios";
import keycloak from "./keycloak.js";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(async (config) => {
  if (keycloak.token) {
    // Refresh token if expiring soon
    await keycloak.updateToken(30);

    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
