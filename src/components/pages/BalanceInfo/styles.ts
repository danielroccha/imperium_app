import { dimens, SCREEN_WIDTH } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    card: {
      padding: dimens.small,
      marginVertical: dimens.base,
    },
    marginContent: { marginVertical: dimens.base },
    image: {
      height: 200,
      width: SCREEN_WIDTH * 0.85,
      alignSelf: "center",
      borderRadius: 10,
    },
  });
