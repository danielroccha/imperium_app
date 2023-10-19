import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { colors } from "@app/configs/Theme";
import styles from "./styles";
import { ColorsPropType } from "@app/types/ThemeType";
import { HeadLine } from "@app/components/atoms/Text";
import { useSelector } from "react-redux";
import { RootState } from "@app/configs/store";
import { currencyList } from "@app/constants";

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
  const { profile } = useSelector((state: RootState) => state.profile);
  const [value, setValue] = useState(defaultValue);

  const theme = colors();

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleBlur = useCallback(() => {
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
  }, [onChangeText, value]);

  const handleFocus = () => {
    setValue("");
  };

  const getCurrency = () => {
    return currencyList.find(i => i.code === profile?.currency)?.symbol;
  };

  const dimissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(
        Number(defaultValue)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&."),
      );
    }
  }, [defaultValue]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {<HeadLine color={color}>{getCurrency()}</HeadLine>}

        <TextInput
          {...props}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={theme.grey}
          underlineColorAndroid={theme[color ?? "black"]}
          selectionColor={theme[color ?? "black"]}
          returnKeyType="done"
          enablesReturnKeyAutomatically
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={[
            styles(theme).input,
            {
              color: theme[color ?? "black"],
            },
          ]}
        />
      </View>

      <View
        style={{
          height: 1.5,
          backgroundColor: theme[color ?? "black"],
        }}
      />
    </View>
  );
};

export default InputMoney;
