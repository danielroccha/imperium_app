import React from "react";
import { View } from "react-native";

import { Caption } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";

import Util from "@app/util";
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@app/configs/store";

type SectionHeaderProps = {
  date: string;
  value: number;
};

const SectionHeader = ({ date, value }: SectionHeaderProps) => {
  const theme = colors();

  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <View style={styles(theme).container}>
      <Caption color="grey">{date}</Caption>
      <Caption color="grey">
        {Util.formatToMoney(value, profile?.currency)}
      </Caption>
    </View>
  );
};

export default SectionHeader;
