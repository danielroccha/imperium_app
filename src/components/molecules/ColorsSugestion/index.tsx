import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import I18n from "@app/languages/I18n";

import { Body, Caption } from "@app/components/atoms/Text";
import { dimens } from "@app/configs/Theme";
import { colorsSugestion } from "@app/constants";

type ColorsSugestionProps = {
  onChange: (value: string) => void;
  error?: boolean;
  value?: string;
};

const ColorsSugestion = ({ onChange, error, value }: ColorsSugestionProps) => {
  const [colorSelected, setColorSelected] = useState(value);

  const handleChange = (index: number) => {
    if (colorsSugestion[index] === colorSelected) {
      setColorSelected("");
    } else {
      setColorSelected(colorsSugestion[index]);
    }
    onChange(colorsSugestion[index]);
  };

  const getOpacity = useCallback(
    (color: string, index: number) => {
      if (colorSelected == "" || colorSelected == undefined) {
        return 2;
      } else if (colorsSugestion[index] === colorSelected) {
        return 2;
      } else {
        return 0.2;
      }
    },
    [colorSelected],
  );

  useEffect(() => {
    if (value) {
      setColorSelected(value);
    }
  }, [value]);

  return (
    <>
      <View style={{ marginVertical: dimens.small }}>
        <Body align="center">{I18n.t("fields.choose_a_color")}</Body>
        {error && (
          <Caption align="center" color="danger">
            {I18n.t("fields.choose_a_color")}
          </Caption>
        )}
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {colorsSugestion.map((color, index) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleChange(index)}
            style={{
              width: 35,
              height: 35,
              margin: dimens.xtiny,
            }}>
            <View
              style={{
                opacity: getOpacity(color, index),
                width: 35,
                height: 35,
                backgroundColor: color,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default ColorsSugestion;
