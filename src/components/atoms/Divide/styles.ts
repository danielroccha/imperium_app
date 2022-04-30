import { SCREEN_WIDTH } from "@app/configs/Theme";
import { StyleSheet } from "react-native";

export default () =>
  StyleSheet.create({
    divide: {
      width: SCREEN_WIDTH * 0.8,
      height: 1.5,
      borderRadius: 50,
      alignSelf: "center",
    },
  });
