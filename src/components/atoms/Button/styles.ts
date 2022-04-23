import { StyleSheet } from "react-native";
import { dimens, getShadow } from "@app/configs/Theme";

export default StyleSheet.create({
  button: {
    display: "flex",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    ...getShadow(2),
  },
  text: {
    textTransform: "uppercase",
  },
  contentButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: dimens.tiny,
  },
});
