import axios from "axios";

import Storage, { KEYS } from "@app/configs/storage";
import enviroments from "@app/configs/enviroment";

import { logOut } from "@app/features/Login/data/loginActions";

const api = axios.create({
  baseURL: enviroments().api,
});

export class Axios {
  static interceptors = {
    request: () => Axios.request,
    response: () => Axios.response,
  };

  static get request() {
    return api.interceptors.request.use(
      async config => {
        const accessToken = await Storage.get(KEYS.TOKEN);
        console.log(accessToken);
        const headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return { ...config, headers };
      },
      err => Promise.reject(err),
    );
  }

  static get response() {
    return api.interceptors.response.use(
      response => response,
      async (err): Promise<void> => {
        return new Promise(async (resolve, reject) => {
          if (err?.response?.status >= 500) {
            // return showNotification(
            //   i18nKeys.translation.error_messages.internal_server_error,
            //   "ERROR",
            // );
          }

          if (err?.response?.status === 401) {
            try {
              const accessToken = Storage.get(KEYS.TOKEN);
              const refreshToken = Storage.get(KEYS.REFRESH_TOKEN);
              const body = { accessToken, refreshToken };
              const response = await axios.post(
                `${enviroments().api}/authentication/refresh-token`,
                body,
              );
              if (response.status === 200) {
                const { data } = response;
                Storage.save(KEYS.TOKEN, data.accessToken);
                Storage.save(KEYS.REFRESH_TOKEN, data.refreshToken);

                const configRetryRequest = {
                  ...err.response.config,
                  Authorization: `Bearer ${data.accessToken}`,
                };

                return api({ ...configRetryRequest })
                  .then(res => resolve(res))
                  .catch(error => reject(error));
              }
            } catch (error) {
              return logOut();
            }
          }
          reject(err);
        });
      },
    );
  }
}

export default api;
