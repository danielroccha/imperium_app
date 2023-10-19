import { StyleSheet } from "react-native";
import { dimens } from "@app/configs/Theme";
import { AvailableColors } from "@app/types/ThemeType";

export default (colors?: AvailableColors) =>
  StyleSheet.create({
    cardItem: {
      flex: 1,
      padding: dimens.small,
      marginBottom: dimens.small,
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
    },
    divide: {
      marginVertical: dimens.small,
    },
    circleColor: {
      width: 18,
      height: 18,

      borderRadius: 9,
      marginRight: dimens.small,
    },
    placeholderBar: {
      width: "50%",
      backgroundColor: colors?.grey,
      height: 5,
      borderRadius: 10,
    },
    bar: {
      width: "75%",
      height: 5,
      borderRadius: 10,
    },
  });
