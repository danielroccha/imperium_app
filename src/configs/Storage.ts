import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refresh_token",
};

const saveApiKey = (apiKey: string) => {
  AsyncStorage.setItem(KEYS.TOKEN, apiKey);
};

const getApiKey = () => AsyncStorage.getItem(KEYS.TOKEN);

const saveRefreshToken = (refreshToken: string) =>
  AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);

const getRefreshToken = () => AsyncStorage.getItem(KEYS.REFRESH_TOKEN);

const removeAllKeys = () => {
  try {
    AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (err) {
    console.log(err);
  }
};

export default {
  saveApiKey,
  saveRefreshToken,
  getApiKey,
  getRefreshToken,
  removeAllKeys,
};
