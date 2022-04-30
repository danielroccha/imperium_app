import { AvailableColors } from "@app/types/ThemeType";
import { StyleSheet } from "react-native";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.mode,
      padding: 15,
    },
  });
