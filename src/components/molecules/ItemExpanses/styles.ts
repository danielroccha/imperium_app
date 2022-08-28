import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";

export default () =>
  StyleSheet.create({
    container: {
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
