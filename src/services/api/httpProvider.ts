import { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

export const httpProvider = (client: AxiosInstance) => {
  const get = function <T>(
    uri: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return client
      .get(uri, config)
      .then((res: AxiosResponse) => res?.data)
      .catch((e) => {
        throw e;
      });
  };

  return { get };
};
