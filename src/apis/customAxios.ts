import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: 10000,
};

export function createCustomAxios(config?: AxiosRequestConfig) {
  return axios.create({
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...(config?.headers || {}),
    },
  });
}

export const publicAPI = axios.create(defaultConfig);
