import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { getSession } from "./session";
import { redirect } from "next/navigation";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession();
    if (session?.token) {
        config.headers.Authorization = session.token;
    } else if (!config.url?.includes("/login")) {
        redirect("/login");
    }
    return config;
};

const onRequestError = (error: AxiosError) => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response.data;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
};

// Add a request interceptor
axiosClient.interceptors.request.use(onRequest, onRequestError);

// Add a response interceptor
axiosClient.interceptors.response.use(onResponse, onErrorResponse);

export default axiosClient;
