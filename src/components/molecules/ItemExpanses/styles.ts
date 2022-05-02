import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.mode,
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
    },
    content: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: dimens.small,
    },
  });
