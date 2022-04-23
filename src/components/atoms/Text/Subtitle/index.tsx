import React, { ReactNode, FC } from "react";
import { StyleProp, TextStyle } from "react-native";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsSubtitle = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
};

const Subtitle: FC<PropsSubtitle> = ({
  children,
  color,
  capitalize,
  style,
  align,
  ...props
}: PropsSubtitle) => {
  return (
    <Text
      style={style}
      size="subtitle"
      color={color}
      weight="semibold"
      capitalize={capitalize}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};

export default Subtitle;
