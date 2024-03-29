import { StyleSheet } from "react-native";

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
