import React, { useEffect, useRef } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { colors, dimens } from "@app/configs/Theme";
import Base from "../Text/Base";
import styles from "./styles";
import { Control, useController } from "react-hook-form";
import { Small } from "../Text";

type InputProps = {
  defaultValue?: string;
  label: string;
  icon: string;
  name: string;
  control: Control<any> | undefined;
  error: boolean;
  errorMessage: string | undefined;
  onChangeValue?: (value: string) => void;
} & TextInputProps;

const Input = ({
  defaultValue,
  label,
  icon,
  control,
  name,
  error,
  errorMessage,
  onChangeValue,
  ...props
}: InputProps) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  const theme = colors();
  const input = useRef<TextInput>(null);

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
        <Base style={{ marginBottom: dimens.tiny }} size="caption">
          {label}
        </Base>
      </View>
      <TouchableWithoutFeedback onPress={dimissKeyboard}>
        <>
          <TextInput
            {...props}
            ref={input}
            value={field.value}
            onChangeText={field.onChange}
            placeholderTextColor={theme.grey}
            underlineColorAndroid="transparent"
            style={[
              styles(theme).input,
              { borderColor: error ? theme.danger : theme.primary },
            ]}
          />
          {errorMessage && <Small color="danger">{errorMessage}</Small>}
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Input;
