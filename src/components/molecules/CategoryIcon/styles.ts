import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    categoryContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      height: 35,
      borderRadius: 25,
    },
  });
