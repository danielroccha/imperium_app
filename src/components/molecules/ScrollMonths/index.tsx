import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Pill from "@app/components/molecules/Pill";
import { colors, SCREEN_WIDTH } from "@app/configs/Theme";
import { months } from "@app/constants";

type ScrollMonthsProps = {
  onTapDate: () => void;
  onSelect: (date: Date) => void;
  dateFilter?: Date;
};

const ScrollMonths = ({
  onSelect,
  onTapDate,
  dateFilter,
}: ScrollMonthsProps) => {
  const theme = colors();

  const [date, setDate] = useState(new Date());

  const currentYear = date.getFullYear();

  const handlePressLeft = () => {
    date.setMonth(date.getMonth() - 1);
    onSelect(date);
    setDate(new Date(date));
  };

  const handlePressRight = () => {
    date.setMonth(date.getMonth() + 1);
    onSelect(date);
    setDate(new Date(date));
  };

  useEffect(() => {
    if (dateFilter) {
      setDate(dateFilter);
    }
  }, [dateFilter]);

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
        <Icon name={"chevron-left"} size={25} color={theme.white} />
      </TouchableOpacity>
      <Pill
        onTap={onTapDate}
        text={`${months[date.getMonth()].substring(0, 3)} ${currentYear}`}
        color="blackTransparent"
      />
      <TouchableOpacity
        onPress={handlePressRight}
        hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
        <Icon name={"chevron-right"} size={25} color={theme.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ScrollMonths;
