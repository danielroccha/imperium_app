import { StyleSheet } from "react-native";

import { dimens, getShadow } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (theme: AvailableColors) =>
  StyleSheet.create({
    container: {
      height: 40,
      backgroundColor: theme.white,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "stretch",
      borderRadius: 10,
      alignSelf: "center",
      ...getShadow(3),
      padding: dimens.xtiny,
    },
    expenseButton: {
      justifyContent: "center",
      width: 100,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    incomeButton: {
      justifyContent: "center",
      width: 100,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
  });
