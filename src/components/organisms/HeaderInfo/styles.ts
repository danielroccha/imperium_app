import { StyleSheet } from "react-native";
import { AvailableColors } from "@app/types/ThemeType";
import { dimens, SCREEN_WIDTH } from "@app/configs/Theme";

export default (theme?: AvailableColors) =>
  StyleSheet.create({
    container: {
      height: 340,
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: dimens.medium,
      backgroundColor: theme?.primary,
    },
    containerScrollView: { height: 40 },
    containerTransactionType: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: SCREEN_WIDTH,
    },
    transactionTypeContainerTitle: {
      flexDirection: "row",
      alignItems: "center",
    },
    containerIcon: {
      borderRadius: 10,
      padding: 5,
      marginRight: 10,
    },
  });
