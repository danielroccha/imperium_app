import React, { ReactNode, FC } from "react";
import { StyleProp, TextStyle, TextProps } from "react-native";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsSmall = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
} & TextProps;

const Small: FC<PropsSmall> = ({
  children,
  color,
  capitalize,
  align,
  ...props
}: PropsSmall) => {
  return (
    <Text
      size="small"
      color={color}
      align={align}
      weight="semibold"
      capitalize={capitalize}
      {...props}>
      {children}
    </Text>
  );
};

export default Small;
