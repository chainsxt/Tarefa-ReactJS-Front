import axios, { isAxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HttpAdapter, HttpRequest, HttpResponse } from "../types/http";
import { setupInterceptors } from "./axios-interceptors";
import { baseURL } from "./env";

class AxiosAdapter implements HttpAdapter {
    private readonly instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }
    public async request<TRequest, TResponse>(
        config: HttpRequest<TRequest>
    ): Promise<HttpResponse<TResponse>> {
        const requestConfig: AxiosRequestConfig = {
            data: config.data,
            method: config.method,
            url: config.url,
            headers: config.headers ?? {"Content-Type": "application/json" },
            params: config.params
    }
    const axiosResponse = await this.instance.request<TResponse>(requestConfig);
    return {
        data: axiosResponse.data,
        status: axiosResponse.status,
        headers: axiosResponse.headers as Record<string, string>,
        raw: axiosResponse
    }
    }

    public getError(error: unknown): Error {
        if (isAxiosError(error)) {
            const message = error.response?.data.message ?? error.message ?? "Erro desconhecido";
            const newError = new Error (message, {cause: error.status});
            newError.name = error.name;
            return newError;
        }
        if (error instanceof Error) {
                return error;
            }

        return new Error("Erro desconhecido");
        }
}


const axiosInstance = axios.create({baseURL});

setupInterceptors(axiosInstance);

export const axiosAdapter = new AxiosAdapter(axiosInstance);
