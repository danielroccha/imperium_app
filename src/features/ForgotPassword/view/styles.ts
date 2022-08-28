import { dimens, SCREEN_WIDTH } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.mode,
      flex: 1,
      padding: dimens.small,
    },
    image: {
      height: 125,
      width: SCREEN_WIDTH * 0.85,
      alignSelf: "center",
    },
  });
