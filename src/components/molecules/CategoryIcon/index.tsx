import { colors } from "@app/configs/Theme";
import React from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

type CategoryIconProps = {
  icon: string;
  color: string;
};

const CategoryIcon = ({ color, icon }: CategoryIconProps) => {
  const theme = colors();
  return (
    <View style={[styles(theme).categoryContainer, { backgroundColor: color }]}>
      <Icon name={icon} size={22} color={theme.mode} />
    </View>
  );
};

export default CategoryIcon;
