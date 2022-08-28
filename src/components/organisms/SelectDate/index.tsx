import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/Feather";

import { Body, Caption } from "@app/components/atoms/Text";
import Pill from "@app/components/molecules/Pill";
import { colors, dimens } from "@app/configs/Theme";
import I18n from "i18n-js";

enum DATES_OPTIONS {
  TODAY = "Hoje",
  TOMORROW = "Amanhã",
  YESTERDAY = "Ontem",
  OTHER = "Outro dia",
}

type SelectDateProps = {
  onChangeDate: (date: Date) => void;
  initialDate?: Date;
};

const SelectDate = ({ onChangeDate, initialDate }: SelectDateProps) => {
  const theme = colors();
  const date = useMemo(() => new Date(), []);

  const [selectedDate, setSelectedDate] = useState(date);
  const [otherDate, setOtherDate] = useState<Date | null>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dates: { dayText: string; date: () => Date }[] = useMemo(
    () => [
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
    ],
    [date],
  );

  const handleTapDate = (index: number) => {
    const itemDate = dates[index];
    setSelectedDate(itemDate.date());
    onChangeDate(itemDate.date());
  };

  const handleConfirmDatePicker = (value: Date) => {
    setSelectedDate(value);
    setOtherDate(value);
    hideDatePicker();
    onChangeDate(value);
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
    if (initialDate) {
      const dateValue = new Date(initialDate);
      setSelectedDate(dateValue);
      onChangeDate(initialDate);
      const [today, tomorrow, yesterday] = dates;
      if (
        dateValue.toLocaleDateString() !== today.date().toLocaleDateString() &&
        dateValue.toLocaleDateString() !==
          tomorrow.date().toLocaleDateString() &&
        dateValue.toLocaleDateString() !== yesterday.date().toLocaleDateString()
      ) {
        setOtherDate(dateValue);
      }
    }
  }, [initialDate, dates, onChangeDate]);

  return (
    <>
      <View>
        <Caption style={{ marginBottom: dimens.small }}>
          {I18n.t("fields.choose_a_date")}
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((item, index) => (
              <Pill
                key={item.dayText}
                text={item.dayText}
                color={
                  selectedDate.toLocaleDateString() ===
                    item.date().toLocaleDateString() && !showDatePicker
                    ? "primary"
                    : "grey"
                }
                onTap={() => handleTapDate(index)}
              />
            ))}
            <Pill
              text={DATES_OPTIONS.OTHER}
              color={showDatePicker ? "primary" : "grey"}
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
        title={I18n.t("fields.choose_a_date")}
        locale="PT-BR"
        onCancel={hideDatePicker}
        theme="light"
        textColor={theme.contrast}
        confirmText={I18n.t("buttons.confirm")}
        cancelText={I18n.t("buttons.cancel")}
      />
    </>
  );
};

export default SelectDate;
