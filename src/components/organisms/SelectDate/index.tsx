import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/Feather";

import { Body, Caption } from "@app/components/atoms/Text";
import Pill from "@app/components/molecules/Pill";
import { colors, dimens } from "@app/configs/Theme";

enum DATES_OPTIONS {
  TODAY = "Hoje",
  TOMORROW = "Amanhã",
  YESTERDAY = "Ontem",
  OTHER = "Outro dia",
}

type SelectDateProps = {
  onChangeDate: (date: Date) => void;
};

const SelectDate = ({ onChangeDate }: SelectDateProps) => {
  const theme = colors();
  const date = new Date();
  const [seletedDate, setSelectedDate] = useState(date);
  const [otherDate, setOtherDate] = useState<Date | null>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dates: { dayText: string; date: () => Date }[] = [
    {
      dayText: DATES_OPTIONS.TODAY,
      date: () => date,
    },
    {
      dayText: DATES_OPTIONS.TOMORROW,
      date: () => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      },
    },
    {
      dayText: DATES_OPTIONS.YESTERDAY,
      date: () => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      },
    },
  ];

  const handleTapDate = (index: number) => {
    const itemDate = dates[index];
    setSelectedDate(itemDate.date());
  };

  const handleConfirmDatePicker = (value: Date) => {
    setSelectedDate(value);
    setOtherDate(value);
    hideDatePicker();
  };

  const handleResetDatePicker = () => {
    setOtherDate(null);
    setSelectedDate(date);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  useEffect(() => {
    onChangeDate(seletedDate);
  }, [seletedDate, onChangeDate]);

  return (
    <>
      <View>
        <Caption style={{ marginBottom: dimens.small }}>
          Selecione a data
        </Caption>
      </View>
      {otherDate ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Body color="primary">{otherDate.toLocaleDateString()}</Body>
          <TouchableOpacity
            onPress={handleResetDatePicker}
            hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
            <Icon name="x-circle" size={20} color={theme.danger} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView horizontal>
            {dates.map((item, index) => (
              <Pill
                key={item.dayText}
                text={item.dayText}
                color={
                  seletedDate.toLocaleDateString() ===
                    item.date().toLocaleDateString() && !showDatePicker
                    ? "primary"
                    : "secondary"
                }
                onTap={() => handleTapDate(index)}
              />
            ))}
            <Pill
              text={DATES_OPTIONS.OTHER}
              color={showDatePicker ? "primary" : "secondary"}
              onTap={openDatePicker}
            />
          </ScrollView>
        </>
      )}
      <DatePicker
        modal
        open={showDatePicker}
        date={new Date()}
        onConfirm={handleConfirmDatePicker}
        mode="date"
        title="Selecione a data"
        locale="PT-BR"
        onCancel={hideDatePicker}
        theme="light"
      />
    </>
  );
};

export default SelectDate;
