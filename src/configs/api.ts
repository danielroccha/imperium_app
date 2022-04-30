import axios from "axios";

import Storage from "@app/configs/storage";
import enviroments from "@app/configs/enviroment";
import showNotification from "@app/components/organisms/CustomNotification";
import I18n from "@app/languages/I18n";
import { logOut } from "@app/features/Login/data/loginActions";

const api = axios.create({
  baseURL: enviroments.baseURL,
});

export class Axios {
  static interceptors = {
    request: () => Axios.request,
    response: () => Axios.response,
  };

  static get request() {
    return api.interceptors.request.use(
      async config => {
        const accessToken = await Storage.getApiKey();
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
              const accessToken = Storage.getApiKey();
              const refreshToken = Storage.getRefreshToken();
              const body = { accessToken, refreshToken };
              const response = await axios.post(
                `${enviroments.baseURL}/authentication/refresh-token`,
                body,
              );
              if (response.status === 200) {
                const { data } = response;
                Storage.saveApiKey(data.accessToken);
                Storage.saveRefreshToken(data.refreshToken);

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

export const handleError = (error: unknown) => {
  showNotification(
    I18n.t(`common.ooops`),
    I18n.t(`error_messages.${error.response.data.error.code}`),
    "error",
  );
};

export default api;
