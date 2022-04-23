import React, { ReactNode, FC } from "react";
import { ColorsPropType } from "@app/types/ThemeType";
import { StyleProp, TextStyle } from "react-native";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsCaption = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
};

const Caption: FC<PropsCaption> = ({
  children,
  color,
  capitalize,
  style,
  align,
  ...props
}: PropsCaption) => {
  return (
    <Text
      style={style}
      size="caption"
      weight="ultrabold"
      color={color}
      capitalize={capitalize}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};

Caption.defaultProps = {
  color: "contrast",
  capitalize: false,
  style: {},
  align: "auto",
};

export default Caption;
