import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import { Body, Small } from "@app/components/atoms/Text";
import { colors, SCREEN_WIDTH } from "@app/configs/Theme";
import styles from "./styles";
import TextMoney from "@app/components/atoms/TextMoney";
import { TRANSACTION_TYPE } from "@app/constants";
import CategoryIcon from "../CategoryIcon";

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

  const theme = colors();

  return (
    <TouchableOpacity onPress={handleSelectItem} onLongPress={handleLongPress}>
      <View style={styles(theme).container}>
        <CategoryIcon icon={icon} color={color} />
        <View style={styles(theme).content}>
          <View style={{ width: SCREEN_WIDTH * 0.25 }}>
            <Body numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Body>
            <Small>{category}</Small>
            {isRecurrence && <Small color="secondary">Recorrência</Small>}
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
