import { StyleSheet } from "react-native";

import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      margin: dimens.xtiny,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      padding: dimens.tiny,
      borderRadius: 10,
      borderColor: theme.white,
      ...getShadow(2),
    },
  });
