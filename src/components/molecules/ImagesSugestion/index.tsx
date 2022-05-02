import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Body, Caption } from "@app/components/atoms/Text";
import styles from "./styles";
import { colors, dimens } from "@app/configs/Theme";
import { iconsSugestion } from "@app/constants";

type ImagesSugestionProps = {
  onChange: (value: string) => void;
  color: string;
  error?: boolean;
};

const ImagesSugestion = ({ onChange, color, error }: ImagesSugestionProps) => {
  const theme = colors();

  const [selectedIcon, setSelectedIcon] = useState("");

  const handlePressIcon = (index: number) => {
    if (iconsSugestion[index] === selectedIcon) {
      setSelectedIcon("");
    } else {
      onChange(iconsSugestion[index]);
      setSelectedIcon(iconsSugestion[index]);
    }
  };

  const getColor = (index: number) => {
    if (iconsSugestion[index] !== selectedIcon) {
      return theme.grey;
    } else {
      return color ? color : theme.primary;
    }
  };

  return (
    <>
      <View style={{ marginVertical: dimens.small }}>
        <Body align="center">Selecione uma imagem</Body>
        {error && (
          <Caption align="center" color="danger">
            Escolha uma imagem
          </Caption>
        )}
      </View>
      <View style={styles(theme).container}>
        {iconsSugestion.map((icon, index) => (
          <TouchableOpacity
            key={icon}
            style={{
              margin: dimens.xtiny,
              borderRadius: 10,
              backgroundColor: getColor(index),
              padding: dimens.tiny,
            }}
            onPress={() => handlePressIcon(index)}>
            <Icon name={icon} size={20} color={theme.white} />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default ImagesSugestion;
