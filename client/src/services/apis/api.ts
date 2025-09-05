"use client";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

interface RequestMetadata {
  startTime: number;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: RequestMetadata;
}

API.interceptors.request.use(
  (config) => {
    (config as ExtendedAxiosRequestConfig).metadata = { startTime: Date.now() };

    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    const metadata = (response.config as ExtendedAxiosRequestConfig).metadata;
    if (metadata) {
      const duration = Date.now() - metadata.startTime;
      console.log(`Request to ${response.config.url} took ${duration}ms`);
    }

    return response;
  },
  (error: AxiosError) => {
    const metadata = (error.config as ExtendedAxiosRequestConfig)?.metadata;
    if (metadata) {
      const duration = Date.now() - metadata.startTime;
      console.error(
        `Request to ${error.config?.url} failed after ${duration}ms:`,
        error.message
      );
    }

    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(
        new Error("Network error - please check your connection")
      );
    }

    return Promise.reject(error);
  }
);

export default API;
