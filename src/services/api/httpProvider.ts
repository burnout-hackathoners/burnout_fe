import { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

export interface HttpError extends AxiosError {
    [x: string]: any;
}

export const httpProvider = (client: AxiosInstance) => {
    const get = function <T>(uri: string, config?: AxiosRequestConfig): Promise<T> {
        return client
            .get(uri, config)
            .then((res: AxiosResponse) => res?.data)
            .catch((e: HttpError) => {
                throw e;
            });
    };

    const head = (uri: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return client
            .head(uri, config)
            .then((res: AxiosResponse) => res)
            .catch((e: HttpError) => {
                throw e;
            });
    };

    return {
        get,
        head,
    };
};
