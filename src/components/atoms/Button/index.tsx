import React, { FC } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { dimens, colors } from "@app/configs/Theme";
import { ColorsPropType } from "@app/types/ThemeType";
import { Caption } from "@app/components/atoms/Text";
import styles from "./styles";

type CustomButtonProps = {
  title: string;
  styleButton?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  backgroundColor?: ColorsPropType;
  disabled?: boolean;
  loading?: boolean;
  loadingSize?: number | "small" | "large" | undefined;
  icon?: string | undefined;
  textColor?: ColorsPropType;
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  styleButton = {},
  textStyle = {},
  onPress,
  backgroundColor = "primary",
  disabled,
  loadingSize,
  loading,
  icon,
  textColor = "white",
  ...props
}: CustomButtonProps) => {
  const theme = colors();

  const color = theme[backgroundColor];
  const colorButton = disabled ? theme.grey : color;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        styleButton,
        {
          backgroundColor: colorButton,
        },
      ]}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator size={loadingSize} color={theme.white} />
      ) : (
        <View style={styles.contentButton}>
          {icon && (
            <Icon
              style={{ marginRight: dimens.tiny }}
              name={icon}
              size={15}
              color={theme.mode}
            />
          )}
          <Caption color={textColor} style={[styles.text, textStyle]}>
            {title}
          </Caption>
        </View>
      )}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  styleButton: {},
  textStyle: {},
  icon: undefined,
  disabled: false,
  loading: undefined,
  onPress: undefined,
  loadingSize: undefined,
};

export default CustomButton;
