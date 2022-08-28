import { StyleSheet } from "react-native";

import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      height: 40,
      backgroundColor: theme.contrastMode,
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 10,
      alignSelf: "center",
      ...getShadow(3),
      padding: dimens.xtiny,
    },
  });
