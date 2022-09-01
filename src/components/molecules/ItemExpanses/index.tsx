import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import I18n from "@app/languages/I18n";
import { Body, Small } from "@app/components/atoms/Text";
import TextMoney from "@app/components/atoms/TextMoney";
import CategoryIcon from "@app/components/molecules/CategoryIcon";

import { SCREEN_WIDTH } from "@app/configs/Theme";
import { TRANSACTION_TYPE } from "@app/constants";
import styles from "./styles";

type ItemExpansesProps = {
  title: string;
  category: string;
  value: number;
  color: string;
  icon: string;
  type: string;
  isRecurrence: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

const ItemExpanses = ({
  title,
  category,
  color,
  icon,
  value,
  type,
  isRecurrence,
  onPress,
  onLongPress,
}: ItemExpansesProps) => {
  const handleSelectItem = useCallback(() => {
    onPress();
  }, [onPress]);

  const handleLongPress = () => {
    onLongPress();
  };

  return (
    <TouchableOpacity onPress={handleSelectItem} onLongPress={handleLongPress}>
      <View style={styles().container}>
        <CategoryIcon icon={icon} color={color} />
        <View style={styles().content}>
          <View style={{ width: SCREEN_WIDTH * 0.3 }}>
            <Body numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Body>
            <Small>{category}</Small>
            {isRecurrence && (
              <Small color="secondary">{I18n.t("home.recurrences")}</Small>
            )}
          </View>
          <TextMoney
            color={type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"}
            size="body"
            weight="bold"
            value={value}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemExpanses;
