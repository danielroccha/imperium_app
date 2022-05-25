import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";

import { colors } from "@app/configs/Theme";
import styles from "./styles";
import { ColorsPropType } from "@app/types/ThemeType";
import { HeadLine } from "@app/components/atoms/Text";

type InputMoneyProps = {
  defaultValue?: string;
  color?: ColorsPropType;
} & TextInputProps;

const InputMoney = ({
  color,
  defaultValue = "0.00",
  onChangeText,
  ...props
}: InputMoneyProps) => {
  const [value, setValue] = useState(defaultValue);

  const theme = colors();

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleBlur = () => {
    if (Number.isNaN(Number(value.replace(",", ".")))) {
      setValue("0.00");
    } else {
      const textAsNumber = Number(value.replace(",", "."));

      const textValue = Number(value.replace(",", "."))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&.");

      setValue(textValue);

      if (onChangeText) onChangeText(String(textAsNumber));
    }
  };

  const handleFocus = () => {
    setValue("");
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <HeadLine color="white">R$</HeadLine>
        <TextInput
          {...props}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={theme.grey}
          underlineColorAndroid="transparent"
          selectionColor={theme.white}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={[
            styles(theme).input,
            {
              color: color ? color : theme.black,
            },
          ]}
        />
      </View>
      <View
        style={{
          height: 1.5,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export default InputMoney;
