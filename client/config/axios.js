import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config?.headers?.Authorization?.includes("Bearer")) {
      return config;
    }

    if (localStorage.getItem("pride")) {
      const { token } = JSON.parse(localStorage.getItem("pride"));
      config.headers.Authorization = token;
      return config;
    }

    // This will throw 401 error
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401) {
      window.location.href = "/auth";
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
