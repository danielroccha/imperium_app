import { StyleSheet } from "react-native";
import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (colors: AvailableColors) =>
  StyleSheet.create({
    viewLoading: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.mode,
      padding: dimens.base,
      borderRadius: 100,
      width: 50,
      height: 50,
      ...getShadow(2),
    },
  });
