import { dimens, fontSize } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    input: {
      borderBottomWidth: 1.5,
      padding: dimens.xtiny,
      fontSize: fontSize.body,
      fontFamily: "Montserrat-Regular",
    },
  });
