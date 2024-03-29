import { Alert, Platform } from "react-native";

import { check, PERMISSIONS } from "react-native-permissions";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();

const formatToMoney = (value: number, currency?: string): string => {
  const currencyData = currency || "BRL";

  try {
    const result = new Intl.NumberFormat("pt-BR", {
      currency: currencyData,
      style: "currency",
    }).format(value);

    return result.toString();
  } catch (error) {
    console.log(error);
    return "";
  }
};

const getMonthIndex = (date: Date): number => {
  return date.getMonth() + 1;
};

const showAlertError = (title: string, message: string) => {
  Alert.alert(title, message, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

const getInitialLetters = (value: string): string => {
  const [first, second] = value?.split(" ");

  let firstLetter = "";
  if (first) {
    firstLetter = first?.charAt(0);
  }
  let secondLetter = "";
  if (second) {
    secondLetter = second?.charAt(0);
  }
  const initials = firstLetter + secondLetter;
  return initials.toUpperCase();
};

const getTimezoneOffset = () => {
  return new Date().getTimezoneOffset();
};

const shouldTrackUser = async (): Promise<boolean> => {
  let shouldTrack = true;
  const trackingStatus = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (
    Platform.OS === "ios" &&
    trackingStatus !== "granted" &&
    trackingStatus !== "unavailable"
  ) {
    shouldTrack = false;
  }

  return shouldTrack;
};

const Util = {
  formatToMoney,
  getMonthIndex,
  capitalize,
  showAlertError,
  getInitialLetters,
  getTimezoneOffset,
  shouldTrackUser,
};

export default Util;
