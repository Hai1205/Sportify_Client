import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
// import NProgress from "nprogress";

// Cấu hình NProgress
// NProgress.configure({
//   showSpinner: false,
//   trickleSpeed: 100,
// });

// Hàm lấy JWT token từ cookies
const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return matches ? matches[2] : null;
};

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as string,
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

// Hàm lấy JWT từ cookies, localStorage hoặc sessionStorage
const getToken = (item: string): string | null => {
  return getCookie(item) || localStorage.getItem(item) || sessionStorage.getItem(item);
};

// Thêm request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // NProgress.start();

    const token = getToken("JWT_TOKEN");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // NProgress.done();
    return response;
  },
  (error) => {
    // NProgress.done();
    return error?.response?.data?.message
      ? Promise.reject(error.response.data.message)
      : Promise.reject(error);
  }
);

export default axiosInstance;
