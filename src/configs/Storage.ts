import AsyncStorage from "@react-native-async-storage/async-storage";

export enum KEYS {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
  CURRENCY = "currency",
  AVATAR = "avatar",
}

const save = async (key: KEYS, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const get = async (key: KEYS): Promise<string | null> => {
  const result = await AsyncStorage.getItem(key);

  return result;
};

const removeAllKeys = () => {
  try {
    AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (err) {
    console.log(err);
  }
};

export default {
  save,
  removeAllKeys,
  get,
};
