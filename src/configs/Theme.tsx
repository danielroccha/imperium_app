import { Dimensions, Platform } from "react-native";

const commomColors = {
  primary: "#6700c1",
  secondary: "#2096f3",
  primaryLight: "#B95EEC",
  secondaryLight: "#D2F4FE",
  danger: "#FF0000",
  warning: "#F4A540",
  green: "#7AC735",
  transparent: "transparent",
  blackTransparent: "rgba(0, 0, 0, 0.5)",
  white: "#FFF",
  black: "#000",
  grey: "#b0b0b0",
};

export const dark = {
  mode: "#000",
  contrast: "#FFF",
  contrastDark: "#1c1c1d",
  contrastMode: "#1c1c1d",
  ...commomColors,
};

export const light = {
  mode: "#FFF",
  contrast: "#000",
  contrastDark: "#FFF",
  contrastMode: "#F2F5F5",
  ...commomColors,
};

export const colors = () => {
  // return Appearance.getColorScheme() === "dark" ? dark : light;
  return light;
};

export const fontSize = {
  small: 12,
  caption: 14,
  body: 16,
  regular: 18,
  subtitle: 22,
  title: 24,
  bigTitle: 28,
  headLine: 32,
};

export const dimens = {
  xtiny: 4,
  tiny: 8,
  small: 16,
  base: 24,
  medium: 32,
  large: 48,
  xlarge: 64,
};

export const fontWeight = {
  normal: "normal",
  semibold: "500",
  ultrabold: "900",
  bold: "bold",
};

const shadowsiOS = (value: number) => {
  return {
    shadowColor: colors().black,
    shadowRadius: 5,
    shadowOffset: {
      height: value,
      width: 0,
    },
    shadowOpacity: 0.2,
  };
};

const shadowsAndroid = [
  null,
  {
    elevation: 1,
  },
  {
    elevation: 2,
  },
  {
    elevation: 3,
  },
  {
    elevation: 4,
  },
  {
    elevation: 5,
  },
];

export const getShadow = (value: number) =>
  Platform.OS === "ios" ? shadowsiOS(value) : shadowsAndroid[value];

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
