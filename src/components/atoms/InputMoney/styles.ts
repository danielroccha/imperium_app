import { dimens, fontSize } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    input: {
      padding: dimens.xtiny,
      fontFamily: "Montserrat-Regular",
      fontSize: fontSize.headLine,
      textAlign: "left",
    },
  });
