import React, { ReactNode, FC } from "react";
import { TextStyle, StyleProp } from "react-native";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsTitle = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
};

export const Title: FC<PropsTitle> = ({
  children,
  color,
  capitalize,
  style,
  align,
  ...props
}: PropsTitle) => {
  return (
    <Text
      size="title"
      color={color}
      weight="bold"
      capitalize={capitalize}
      style={style}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};
export default React.memo(Title);
