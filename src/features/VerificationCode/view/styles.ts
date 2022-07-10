import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: dimens.small,
      backgroundColor: theme.mode,
    },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      textAlign: "center",
      borderRadius: 5,
      ...getShadow(5),
      backgroundColor: theme.contrastMode,
      borderColor: theme.primary,
    },
    focusCell: {
      borderColor: theme.secondary,
    },
    textInputStyle: {
      backgroundColor: theme.danger,
      borderRadius: 5,
    },
  });
