import { StyleSheet } from "react-native";
import { AvailableColors } from "app/types/ThemeType";

export default (colors: AvailableColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.contrastMode,
      borderTopWidth: 0.5,
      borderTopColor: colors.contrastDark
    }
  });
};
