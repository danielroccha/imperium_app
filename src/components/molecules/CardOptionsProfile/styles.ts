import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, dimens, fontSize } from "app/Theme";
import { AvailableColors } from "app/types/ThemeType";

export default (colors: AvailableColors) =>
  StyleSheet.create({
    container: { marginVertical: dimens.xtiny, alignSelf: "center" },
    textTitleCard: {
      textAlign: "center",
      color: colors.secondary,
      fontSize: fontSize.subtitle,
      marginHorizontal: 15,
      marginVertical: 10
    },
    card: {
      width: SCREEN_WIDTH * 0.9,
      padding: dimens.small,
      backgroundColor: colors.contrastDark
    },
    touchable: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10
    },
    cellLeft: { flexDirection: "row", alignItems: "center" },
    containerText: { marginLeft: 10 },
    textOptions: { color: colors.contrastLight, fontSize: fontSize.regular }
  });
