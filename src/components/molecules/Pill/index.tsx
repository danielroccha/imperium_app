import React from "react";
import { TouchableOpacity } from "react-native";

import { Caption } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";
import { ColorsPropType } from "@app/types/ThemeType";
type PillProps = {
  text: string;
  color: ColorsPropType;
  onTap?: () => void;
};

const Pill = ({ color, text, onTap }: PillProps) => {
  const theme = colors();

  const handleTap = () => {
    if (onTap) {
      onTap();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTap}
      style={{
        padding: dimens.tiny,
        backgroundColor: theme[color],
        height: 40,
        marginHorizontal: dimens.tiny,
        borderRadius: 100,
        justifyContent: "center",
        width: 120,
      }}>
      <Caption color="white" align="center">
        {text}
      </Caption>
    </TouchableOpacity>
  );
};

export default Pill;
