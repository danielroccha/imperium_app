import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { Body, Caption } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";
import { colorsSugestion } from "@app/constants";

type ColorsSugestionProps = {
  onChange: (value: string) => void;
  error?: boolean;
};

const ColorsSugestion = ({ onChange, error }: ColorsSugestionProps) => {
  const theme = colors();

  const [colorSelected, setColorSelected] = useState("");

  const handleChange = (index: number) => {
    if (colorsSugestion[index] === colorSelected) {
      setColorSelected("");
    } else {
      setColorSelected(colorsSugestion[index]);
    }
    onChange(colorsSugestion[index]);
  };

  const getColor = (color: string, index: number) => {
    if (colorSelected == "") {
      return color;
    } else if (colorsSugestion[index] === colorSelected) {
      return colorsSugestion[index];
    } else {
      return theme.grey;
    }
  };

  return (
    <>
      <View style={{ marginVertical: dimens.small }}>
        <Body align="center">Selecione a cor</Body>
        {error && (
          <Caption align="center" color="danger">
            Escolha uma cor
          </Caption>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {colorsSugestion.map((color, index) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleChange(index)}
            style={{
              width: 50,
              height: 50,
              backgroundColor: getColor(color, index),
              borderRadius: 10,
              marginHorizontal: dimens.tiny,
            }}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default ColorsSugestion;
