import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.mode,
      flex: 1,
      justifyContent: "space-evenly",
      padding: dimens.small,
    },
    containerScrollView: { height: 40 },
  });
