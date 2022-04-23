import React, { ReactNode, FC } from "react";
import {
  Text as RNText,
  TextStyle,
  StyleProp,
  Platform,
  PixelRatio,
} from "react-native";
import {
  FontSizePropType,
  FontWeightPropType,
  ColorsPropType,
} from "@app/types/ThemeType";
import { capitalize as textCapitalize } from "@app/util";
import { fontSize, colors } from "@app/configs/Theme";

export type TextAlign = "center" | "auto" | "left" | "right" | "justify";

type Props = {
  children: ReactNode;
  color?: ColorsPropType;
  size?: FontSizePropType;
  style?: StyleProp<TextStyle>;
  weight?: FontWeightPropType;
  capitalize?: boolean;
  align?: TextAlign;
};

const Base: FC<Props> = ({
  children,
  color = "contrast",
  size = "regular",
  style,
  weight = "normal",
  capitalize,
  align = "auto",
  ...props
}: Props) => {
  const text = capitalize ? textCapitalize(children) : children;
  const getFontFamily = (bold: FontWeightPropType): string => {
    switch (bold) {
      case "light":
        return "Montserrat-Light";
      case "semibold":
        return "Montserrat-Medium";
      case "bold":
        return "Montserrat-Bold";
      case "ultrabold":
        return "Montserrat-ExtraBold";

      default:
        return "Montserrat-Regular";
    }
  };
  const styleDefault: StyleProp<TextStyle> = {
    fontSize:
      Platform.OS === "ios"
        ? fontSize[size]
        : fontSize[size] * PixelRatio.getFontScale(),
    color: colors()[color],
    fontFamily: getFontFamily(weight),
    textAlign: align,
  };
  return (
    <RNText
      {...props}
      style={[style, styleDefault]}
      maxFontSizeMultiplier={fontSize.headLine}>
      {text}
    </RNText>
  );
};

export default React.memo(Base);
