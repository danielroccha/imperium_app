import { StyleSheet } from "react-native";
import { colors, getShadow } from "@app/configs/Theme";

export default StyleSheet.create({
  card: {
    ...getShadow(2),
    backgroundColor: colors().contrastDark,
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 5,
  },
});
