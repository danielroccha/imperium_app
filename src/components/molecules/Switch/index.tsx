import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Body } from "@app/components/atoms/Text";
import styles from "./styles";
import { colors, dimens } from "@app/configs/Theme";
import { ColorsPropType } from "@app/types/ThemeType";

type OptionSwitch = {
  text: string;
  value: string;
  color?: string;
};

type SwitchTransactionTypeProps = {
  options: OptionSwitch[];
  onChange: (value: string) => void;
  error?: boolean;
  text?: string;
  value?: string;
  disableSwitchTypeTransaction?: boolean;
  showLabel?: boolean;
  colorLabel?: ColorsPropType;
};

const Switch = ({
  options,
  onChange,
  error,
  text = "Escolha o tipo",
  value,
  disableSwitchTypeTransaction,
  showLabel = false,
  colorLabel,
}: SwitchTransactionTypeProps) => {
  const theme = colors();

  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelectOption = (item: OptionSwitch) => {
    if (item.value === selectedOption) {
      setSelectedOption("");
      onChange("");
    } else {
      setSelectedOption(item.value);
      onChange(item.value);
    }
  };

  const getColorLabel = () => {
    if (colorLabel) {
      return colorLabel;
    } else if (error) {
      return "danger";
    } else {
      return "contrast";
    }
  };

  const getColor = (item: OptionSwitch) => {
    if (item.value === selectedOption) {
      return item.color ? item.color : theme.primary;
    } else return theme.white;
  };

  return (
    <View>
      <View>
        {!disableSwitchTypeTransaction && showLabel && (
          <Body align="center" color={getColorLabel()}>
            {text}
          </Body>
        )}
      </View>
      <View style={styles(theme).container}>
        {options.map((item, index, data) => (
          <TouchableOpacity
            key={item.value}
            hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
            style={[
              {
                width: 180,
                paddingHorizontal: dimens.small,
                justifyContent: "center",
                backgroundColor: getColor(item),
                borderBottomLeftRadius: index === 0 ? 10 : 0,
                borderTopLeftRadius: index === 0 ? 10 : 0,
                borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
                borderTopRightRadius: index === data.length - 1 ? 10 : 0,
              },
            ]}
            onPress={() => handleSelectOption(item)}>
            <Body
              align="center"
              color={selectedOption === item.value ? "white" : "black"}>
              {item.text}
            </Body>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Switch;
