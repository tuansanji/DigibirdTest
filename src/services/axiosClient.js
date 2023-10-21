import { store } from "../redux/store";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://test-pos.digibird.io/api/v1/front",
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: params => queryString.stringify(params),
});

// lấy token của người dùng
const getAccessToken = () => {
  const state = store.getState();
  return state?.auth?.userInfo?.token;
};

axiosClient.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
