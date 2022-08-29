import React from "react";
import AnimateNumber from "react-native-countup";
import Util from "@app/util";
import Base from "@app/components/atoms/Text/Base";
import {
  ColorsPropType,
  FontSizePropType,
  FontWeightPropType,
} from "@app/types/ThemeType";
import { StyleProp, TextStyle } from "react-native";
import { TextAlign } from "../Text/Base";
import { useSelector } from "react-redux";
import { RootState } from "@app/configs/store";

type TextMoneyProps = {
  value: number;
  color?: ColorsPropType;
  size?: FontSizePropType;
  style?: StyleProp<TextStyle>;
  weight?: FontWeightPropType;
  capitalize?: boolean;
  align?: TextAlign;
  animation?: boolean;
};

const TextMoney = ({
  value,
  align,
  capitalize,
  color = "contrast",
  size,
  style,
  weight,
  animation = false,
}: TextMoneyProps) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <Base
      align={align}
      capitalize={capitalize}
      color={color}
      size={size}
      style={style}
      weight={weight}>
      {animation ? (
        <AnimateNumber
          initial={value * 0.95}
          value={value}
          formatter={(val: string) =>
            `${Util.formatToMoney(Number(val), profile?.currency)}`
          }
          timing="linear"
        />
      ) : (
        Util.formatToMoney(Number(value), profile?.currency)
      )}
    </Base>
  );
};

export default TextMoney;
