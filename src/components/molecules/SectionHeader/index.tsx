import React from "react";
import { View } from "react-native";

import { Caption } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";

import Util from "@app/util";
import styles from "./styles";

type SectionHeaderProps = {
  date: string;
  value: number;
};

const SectionHeader = ({ date, value }: SectionHeaderProps) => {
  const theme = colors();

  const dateObj = new Date(date);
  return (
    <View>
      <View style={styles(theme).container}>
        <Caption color="grey">{new Date(dateObj).toLocaleDateString()}</Caption>
        <Caption color="grey">{Util.formatToMoney(value)}</Caption>
      </View>
    </View>
  );
};

export default SectionHeader;
