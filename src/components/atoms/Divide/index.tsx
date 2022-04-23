import React, { FC } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { ColorsPropType } from "@app/types/ThemeType";
import { colors } from "@app/configs/Theme";
import styles from "./styles";

type DivideProps = {
  stylesDivide?: StyleProp<ViewStyle>;
  color?: ColorsPropType;
};

const Divide: FC<DivideProps> = ({
  color = "grey",
  stylesDivide,
}: DivideProps) => {
  const theme = colors();
  return (
    <View
      style={[
        { backgroundColor: theme[color] || theme.contrast },
        styles().divide,
        stylesDivide,
      ]}
    />
  );
};

Divide.defaultProps = {
  stylesDivide: {},
  color: "contrastMode",
};

export default React.memo(Divide);
