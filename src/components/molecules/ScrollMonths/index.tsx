import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";

import Pill from "@app/components/molecules/Pill";
import Util from "@app/util";
import { colors, SCREEN_WIDTH } from "@app/configs/Theme";

type ScrollMonthsProps = {
  onSelect: (month: number) => void;
};

const ScrollMonths = ({ onSelect }: ScrollMonthsProps) => {
  const theme = colors();

  const [date, setDate] = useState(new Date());

  const currentYear = date.getFullYear();
  const months = moment.monthsShort();

  const handlePressLeft = () => {
    date.setMonth(date.getMonth() - 1);
    onSelect(Util.getMonthIndex(date));
    setDate(new Date(date));
  };

  const handlePressRight = () => {
    date.setMonth(date.getMonth() + 1);
    onSelect(Util.getMonthIndex(date));
    setDate(new Date(date));
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH * 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
      <TouchableOpacity
        onPress={handlePressLeft}
        hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
        <Icon name={"chevron-left"} size={25} color={theme.mode} />
      </TouchableOpacity>
      <Pill
        text={`${months[date.getMonth()]} ${currentYear}`}
        color="blackTransparent"
      />
      <TouchableOpacity
        onPress={handlePressRight}
        hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
        <Icon name={"chevron-right"} size={25} color={theme.mode} />
      </TouchableOpacity>
    </View>
  );
};

export default ScrollMonths;
