import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    categoryContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 42,
      height: 42,
      borderRadius: 25,
    },
  });
