import { StyleSheet } from "react-native";
import { getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (colors: AvailableColors) =>
  StyleSheet.create({
    viewLoading: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      backgroundColor: colors.contrastMode,
      ...getShadow(2),
    },
  });
