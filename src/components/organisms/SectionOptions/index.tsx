import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Divide from "@app/components/atoms/Divide";
import { Small } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";
import styles from "./styles";

type SectionOptionsProps = {
  onTapAddTransaction: () => void;
  onTapAddCategory: () => void;
  onTapAddRecurrence: () => void;
};

const SectionOptions = ({
  onTapAddCategory,
  onTapAddTransaction,
  onTapAddRecurrence,
}: SectionOptionsProps) => {
  const theme = colors();
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>
      <View style={styles(theme).container}>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={onTapAddRecurrence}>
          <View style={styles(theme).containerIcon}>
            <Icon name="repeat" size={18} color={theme.white} />
          </View>
          <Small color="primary" align="center">
            Recorrências
          </Small>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={onTapAddTransaction}>
          <View style={styles(theme).containerIcon}>
            <Icon name="dollar-sign" size={18} color={theme.white} />
          </View>
          <Small color="primary" align="center">
            Fazer lançamento
          </Small>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(theme).button}
          onPress={onTapAddCategory}>
          <View style={styles(theme).containerIcon}>
            <Icon name="grid" size={18} color={theme.white} />
          </View>
          <Small color="primary" align="center">
            Categorias
          </Small>
        </TouchableOpacity>
      </View>
      <Divide />
    </View>
  );
};

export default SectionOptions;
