import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

export const KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refresh_token",
  APPEARANCE: "appearance",
};

const saveApiKey = (apiKey: string) => {
  AsyncStorage.setItem(KEYS.TOKEN, apiKey);
};

const getApiKey = () => AsyncStorage.getItem(KEYS.TOKEN);

const saveRefreshToken = (refreshToken: string) =>
  AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);

const getRefreshToken = () => AsyncStorage.getItem(KEYS.REFRESH_TOKEN);

const getAppearance = async (): Promise<string | null> => {
  const value = AsyncStorage.getItem(KEYS.APPEARANCE);
  return value;
};

const saveAppearance = (value: ColorSchemeName): Promise<void> | void => {
  if (value) {
    AsyncStorage.setItem(KEYS.APPEARANCE, value);
  }
};

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
  getAppearance,
  saveAppearance,
  removeAllKeys,
};
