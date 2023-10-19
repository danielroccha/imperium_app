import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: dimens.small,
      height: 50,
      ...getShadow(4),
      backgroundColor: theme.mode,
      zIndex: 999,
    },
  });
