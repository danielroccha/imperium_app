import React, { ReactNode, FC } from "react";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsBigTitle = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  align?: TextAlign;
};

const BigTitle: FC<PropsBigTitle> = ({
  children,
  color,
  capitalize,
  align,
  ...props
}: PropsBigTitle) => {
  return (
    <Text
      size="bigTitle"
      color={color}
      weight="bold"
      capitalize={capitalize}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};

export default BigTitle;
