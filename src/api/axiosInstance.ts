import axios, { type AxiosError } from 'axios';

interface ErrorResponse {
  message: string[];
  statusCode: number;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `KakaoAK ${import.meta.env.VITE_API_KEY}`
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const { response } = error;

    console.error(response?.data.message);

    return Promise.reject(error);
  }
);
