import React, { useEffect } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { colors, dimens, fontSize } from "@app/configs/Theme";
import Base, { TextAlign } from "../Text/Base";
import styles from "./styles";
import { Control, useController } from "react-hook-form";
import { Small } from "../Text";
import { ColorsPropType, FontSizePropType } from "@app/types/ThemeType";

type InputProps = {
  defaultValue?: string;
  label?: string;
  icon?: string;
  name: string;
  control?: Control<any> | undefined;
  error?: boolean;
  errorMessage?: string | undefined;
  size?: FontSizePropType;
  onChangeValue?: (value: string) => void;
  alignError?: TextAlign;
  color?: ColorsPropType;
  borderColor?: ColorsPropType;
} & TextInputProps;

const Input = ({
  defaultValue,
  label,
  icon,
  control,
  name,
  error,
  errorMessage,
  size = "body",
  onChangeValue,
  alignError,
  color,
  borderColor = "primary",
  ...props
}: InputProps) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  const theme = colors();

  const dimissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(field.value);
    }
  }, [field.value, onChangeValue]);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon && (
          <Icon
            style={{ marginRight: dimens.tiny, marginBottom: dimens.tiny }}
            name={icon}
            size={15}
            color={theme.primary}
          />
        )}
        {label && (
          <Base style={{ marginBottom: dimens.tiny }} size="caption">
            {label}
          </Base>
        )}
      </View>
      <TouchableWithoutFeedback onPress={dimissKeyboard}>
        <View>
          <TextInput
            {...props}
            value={field.value}
            onChangeText={field.onChange}
            placeholderTextColor={theme.grey}
            underlineColorAndroid="transparent"
            style={[
              styles(theme).input,
              {
                borderColor: error ? theme.danger : theme[borderColor],
                fontSize: size ? fontSize[size] : fontSize.body,
                color: color ? color : theme.contrast,
              },
            ]}
          />
          {errorMessage && (
            <Small align={alignError ?? "left"} color="danger">
              {errorMessage}
            </Small>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Input;
