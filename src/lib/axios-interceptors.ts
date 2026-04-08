import type { AxiosInstance } from "axios";

export function setupInterceptors(instance: AxiosInstance) {
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        }
    );
}