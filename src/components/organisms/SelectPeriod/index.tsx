import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import I18n from "@app/languages/I18n";

import { Regular } from "@app/components/atoms/Text";
import Pill from "@app/components/molecules/Pill";

import { colors, dimens } from "@app/configs/Theme";
import { OPTIONS_PERIOD } from "@app/constants";

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
        return I18n.t("transaction.days");
      case OPTIONS_PERIOD.MONTHLY:
        return I18n.t("transaction.months");
      case OPTIONS_PERIOD.WEEKLY:
        return I18n.t("transaction.weeks");
      default:
        return I18n.t("transaction.years");
    }
  };

  const getText = (value: OPTIONS_PERIOD) => {
    switch (value) {
      case OPTIONS_PERIOD.DAILY:
        return I18n.t("transaction.daily");
      case OPTIONS_PERIOD.MONTHLY:
        return I18n.t("transaction.monthly");
      case OPTIONS_PERIOD.WEEKLY:
        return I18n.t("transaction.weekly");
      default:
        return I18n.t("transaction.yearly");
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
                color={period === item.text ? "primary" : "grey"}
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
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Icon
            name="minus"
            size={28}
            color={times === 2 ? theme.grey : theme.secondary}
          />
        </TouchableOpacity>
        <Regular color="primary">{`${I18n.t(
          "transaction.for",
        )} ${times} ${getLabelPeriod()}`}</Regular>
        <TouchableOpacity
          disabled={times === 100}
          onPress={handleIncreaseTimes}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
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
