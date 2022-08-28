import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import I18n from "@app/languages/I18n";

import { Body, Caption } from "@app/components/atoms/Text";
import styles from "./styles";
import { colors, dimens } from "@app/configs/Theme";
import { iconsSugestion } from "@app/constants";

type ImagesSugestionProps = {
  onChange: (value: string) => void;
  color: string;
  error?: boolean;
  value?: string;
};

const ImagesSugestion = ({
  onChange,
  color,
  error,
  value,
}: ImagesSugestionProps) => {
  const theme = colors();

  const [selectedIcon, setSelectedIcon] = useState(value);

  const handlePressIcon = useCallback(
    (index: number) => {
      if (iconsSugestion[index] === selectedIcon) {
        setSelectedIcon("");
      } else {
        onChange(iconsSugestion[index]);
        setSelectedIcon(iconsSugestion[index]);
      }
    },
    [onChange, selectedIcon],
  );

  const getColor = useCallback(
    (index: number) => {
      if (iconsSugestion[index] !== selectedIcon) {
        return theme.grey;
      } else {
        return color ? color : theme.primary;
      }
    },
    [color, theme.primary, theme.grey, selectedIcon],
  );

  useEffect(() => {
    if (value) {
      setSelectedIcon(value);
    }
  }, [value]);

  return (
    <>
      <View style={{ marginVertical: dimens.small }}>
        <Body align="center">{I18n.t("fields.choose_a_image")}</Body>
        {error && (
          <Caption align="center" color="danger">
            {I18n.t("fields.choose_a_image")}
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
