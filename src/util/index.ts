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
    return "";
  }
};

const getMonthIndex = (date: Date): number => {
  return date.getMonth() + 1;
};

const Util = {
  formatToMoney,
  getMonthIndex,
};

export default Util;
