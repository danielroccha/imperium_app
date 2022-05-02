import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import ScrollMonths from "@app/components/molecules/ScrollMonths";
import { Regular, Body } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";
import SectionOptions from "@app/components/organisms/SectionOptions";
import styles from "./styles";
import TextMoney from "@app/components/atoms/TextMoney";
import { useNavigation } from "@react-navigation/native";

type HeaderInfoProps = {
  onFilterDate: (monthIndex: number) => void;
  currentBalance: number;
  expensesBalance: number;
  incomesBalance: number;
};

const HeaderInfo = ({
  onFilterDate,
  currentBalance,
  expensesBalance,
  incomesBalance,
}: HeaderInfoProps) => {
  const theme = colors();
  const navigation = useNavigation();

  const handleAddCategory = () => {
    navigation.navigate("CategoryStack");
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles().containerScrollView}>
        <ScrollMonths onSelect={onFilterDate} />
      </View>
      <View>
        <Regular color="white" align="center">
          Saldo Atual
        </Regular>
        <TextMoney
          size="bigTitle"
          align="center"
          weight="bold"
          value={currentBalance}
          color="white"
          animation
        />
      </View>
      <View style={styles(theme).containerTransactionType}>
        <View>
          <View style={styles(theme).transactionTypeContainerTitle}>
            <View
              style={[
                styles(theme).containerIcon,
                { backgroundColor: theme.green },
              ]}>
              <Icon name="dollar-sign" size={18} color={theme.mode} />
            </View>
            <Body color="white">Receita</Body>
          </View>
          <TextMoney
            size="body"
            align="center"
            weight="bold"
            value={incomesBalance}
            color="white"
            animation
          />
        </View>
        <View>
          <View style={styles(theme).transactionTypeContainerTitle}>
            <View
              style={[
                styles(theme).containerIcon,
                { backgroundColor: theme.danger },
              ]}>
              <Icon name="arrow-down-left" size={18} color={theme.mode} />
            </View>
            <Body color="white">Gastos</Body>
          </View>
          <TextMoney
            size="body"
            align="center"
            weight="bold"
            value={expensesBalance}
            color="white"
            animation
          />
        </View>
      </View>
      <SectionOptions
        onTapAddCategory={handleAddCategory}
        onTapAddTransaction={() => null}
      />
    </View>
  );
};

export default HeaderInfo;
