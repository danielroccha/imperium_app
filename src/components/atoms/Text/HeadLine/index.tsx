import React, { ReactNode, FC } from "react";
import { ColorsPropType } from "@app/types/ThemeType";
import Text, { TextAlign } from "@app/components/atoms/Text/Base";

type PropsHeadLine = {
  children: ReactNode;
  color?: ColorsPropType;
  capitalize?: boolean;
  align?: TextAlign;
};

const HeadLine: FC<PropsHeadLine> = ({
  children,
  color,
  capitalize,
  align,
  ...props
}: PropsHeadLine) => {
  return (
    <Text
      size="headLine"
      color={color}
      weight="light"
      capitalize={capitalize}
      align={align}
      {...props}>
      {children}
    </Text>
  );
};

export default HeadLine;
