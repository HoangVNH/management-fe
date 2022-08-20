import axios from "axios";
import queryString from "querystring";
import { getAccessTokenFromLocalStorage } from "../helper/auth";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getAccessTokenFromLocalStorage();

    config.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : undefined;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
