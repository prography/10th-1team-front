import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: 30000,
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

/**
 * 비인증 기본 API
 */
export const publicAPI = createCustomAxios();

/**
 * 인증 프록시 API
 * 프록시 서버를 통해 인증 정보를 전달하여 백엔드 API 호출
 */
export const authProxyAPI = createCustomAxios({
  baseURL: "/api/proxy",
});
