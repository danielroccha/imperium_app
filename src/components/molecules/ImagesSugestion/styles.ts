import { StyleSheet } from "react-native";

import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
  });
