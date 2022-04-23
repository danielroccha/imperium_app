import React, { ReactNode, FC } from "react";
import { StyleProp, TextStyle } from "react-native";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsBody = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
};

const Body: FC<PropsBody> = ({
  children,
  color,
  capitalize,
  style,
  align,
  ...props
}: PropsBody) => {
  return (
    <Text
      style={style}
      size="body"
      color={color}
      weight="bold"
      capitalize={capitalize}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};

export default Body;
