import { StyleSheet } from "react-native";
import { AvailableColors } from "@app/types/ThemeType";
import { dimens, SCREEN_WIDTH } from "@app/configs/Theme";

export default (theme?: AvailableColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: SCREEN_WIDTH,
      backgroundColor: theme?.white,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 85,
      alignItems: "center",
    },
    button: {
      width: 80,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    containerIcon: {
      width: 40,
      height: 40,
      backgroundColor: theme?.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: dimens.xtiny,
    },
  });
