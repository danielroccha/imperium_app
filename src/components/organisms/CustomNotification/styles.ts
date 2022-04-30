import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (colors: AvailableColors) =>
  StyleSheet.create({
    warning: {
      backgroundColor: colors.warning,
    },
    success: {
      backgroundColor: colors.green,
    },
    info: {
      backgroundColor: colors.secondary,
    },
    error: {
      backgroundColor: colors.danger,
    },
    default: {
      backgroundColor: colors.primary,
    },
    container: {
      padding: dimens.small,
      flexDirection: "row",
      alignItems: "center",
    },
    containerText: {
      marginLeft: dimens.small,
      width: "100%",
    },
    title: { width: "80%" },
    description: {
      width: "80%",
    },
  });
