import { Alert } from "react-native";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();

const formatToMoney = (value: number): string => {
  try {
    const result = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
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

const Util = {
  formatToMoney,
  getMonthIndex,
  capitalize,
  showAlertError,
  getInitialLetters,
};

export default Util;
