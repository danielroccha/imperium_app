import React, { useRef } from "react";
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

type InputProps = {
  label: string;
  icon: string;
} & TextInputProps;

const Input = ({ label, icon, ...props }: InputProps) => {
  const theme = colors();
  const input = useRef<TextInput>(null);

  const dimissKeyboard = () => {
    console.log("teste");
    Keyboard.dismiss();
  };

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
        <TextInput
          {...props}
          ref={input}
          placeholderTextColor={theme.grey}
          underlineColorAndroid="transparent"
          style={styles(theme).input}
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default Input;
