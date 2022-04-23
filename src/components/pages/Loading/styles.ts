import { StyleSheet } from "react-native";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  dimens,
  getShadow,
} from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (colors: AvailableColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.mode,
      alignItems: "center",
    },
    backgroundAbsolute: {
      position: "absolute",
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    },
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
