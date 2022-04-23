import React, { ReactNode, FC } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card: FC<CardProps> = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default React.memo(Card);
