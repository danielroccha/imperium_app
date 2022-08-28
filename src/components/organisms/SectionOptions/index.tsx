import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Divide from "@app/components/atoms/Divide";
import { Small } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";
import styles from "./styles";
import I18n from "i18n-js";

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
        backgroundColor: theme.mode,
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
          <Small color="contrast" align="center">
            {I18n.t("home.recurrences")}
          </Small>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={onTapAddTransaction}>
          <View style={styles(theme).containerIcon}>
            <Icon name="dollar-sign" size={18} color={theme.white} />
          </View>
          <Small color="contrast" align="center">
            {I18n.t("home.create_transaction")}
          </Small>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(theme).button}
          onPress={onTapAddCategory}>
          <View style={styles(theme).containerIcon}>
            <Icon name="grid" size={18} color={theme.white} />
          </View>
          <Small color="contrast" align="center">
            {I18n.t("home.categories")}
          </Small>
        </TouchableOpacity>
      </View>
      <Divide color="contrastMode" stylesDivide={{ height: 0.8 }} />
    </View>
  );
};

export default SectionOptions;
