import { Regular } from "@app/components/atoms/Text";
import Pill from "@app/components/molecules/Pill";
import { colors, dimens } from "@app/configs/Theme";
import { OPTIONS_PERIOD } from "@app/constants";
import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const options = [
  {
    text: OPTIONS_PERIOD.MONTHLY,
  },
  {
    text: OPTIONS_PERIOD.YEARLY,
  },
  {
    text: OPTIONS_PERIOD.DAILY,
  },
  {
    text: OPTIONS_PERIOD.WEEKLY,
  },
];

type SelectPeriodProps = {
  onSelectRepeatType: (value: OPTIONS_PERIOD) => void;
  onChangeRepeat: (value: number) => void;
};

const SelectPeriod = ({
  onSelectRepeatType,
  onChangeRepeat,
}: SelectPeriodProps) => {
  const [times, setTimes] = useState(2);
  const [period, setPeriod] = useState<OPTIONS_PERIOD>(OPTIONS_PERIOD.MONTHLY);
  const theme = colors();

  const handleIncreaseTimes = () => {
    const newValue = times + 1;
    setTimes(newValue);
  };

  const handleDecreaseTimes = () => {
    const newValue = times - 1;
    setTimes(newValue);
  };

  const handleTapPeriod = (item: { text: OPTIONS_PERIOD }) => {
    setPeriod(item.text);
  };

  const getLabelPeriod = () => {
    switch (period) {
      case OPTIONS_PERIOD.DAILY:
        return "dias";
      case OPTIONS_PERIOD.MONTHLY:
        return "meses";
      case OPTIONS_PERIOD.WEEKLY:
        return "semanas";
      default:
        return "anos";
    }
  };

  const getText = (value: OPTIONS_PERIOD) => {
    switch (value) {
      case OPTIONS_PERIOD.DAILY:
        return "Diariamente";
      case OPTIONS_PERIOD.MONTHLY:
        return "Mensalmente";
      case OPTIONS_PERIOD.WEEKLY:
        return "Semanalmente";
      default:
        return "Anualmente";
    }
  };

  useEffect(() => {
    onChangeRepeat(times);
    onSelectRepeatType(period);
  }, [onChangeRepeat, onSelectRepeatType, period, times]);

  return (
    <View style={{ marginVertical: dimens.base }}>
      <View style={{ marginBottom: dimens.base }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map(item => (
            <View key={item.text}>
              <Pill
                text={getText(item.text)}
                color={period === item.text ? "primary" : "secondary"}
                onTap={() => handleTapPeriod(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}>
        <TouchableOpacity
          disabled={times === 2}
          onPress={handleDecreaseTimes}
          hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <Icon
            name="minus"
            size={28}
            color={times === 2 ? theme.grey : theme.secondary}
          />
        </TouchableOpacity>
        <Regular color="primary">{`durante ${times} ${getLabelPeriod()}`}</Regular>
        <TouchableOpacity
          disabled={times === 100}
          onPress={handleIncreaseTimes}
          hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <Icon
            name="plus"
            size={28}
            color={times === 100 ? theme.grey : theme.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectPeriod;
