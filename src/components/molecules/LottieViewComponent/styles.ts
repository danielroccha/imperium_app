import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";

export default () =>
  StyleSheet.create({
    viewLottie: {
      alignItems: "center",
      justifyContent: "center",
      padding: dimens.base,
    },
  });
