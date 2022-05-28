import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import ScrollMonths from "@app/components/molecules/ScrollMonths";
import { Regular, Body, Small } from "@app/components/atoms/Text";
import { colors, dimens, SCREEN_WIDTH } from "@app/configs/Theme";
import SectionOptions from "@app/components/organisms/SectionOptions";
import styles from "./styles";
import TextMoney from "@app/components/atoms/TextMoney";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";

type HeaderInfoProps = {
  onFilterDate: (date: Date) => void;
  onTapDate: () => void;
  dateFilter?: Date;
  currentBalance: number;
  expensesBalance: number;
  incomesBalance: number;
};

const HeaderInfo = ({
  onFilterDate,
  onTapDate,
  dateFilter,
  currentBalance,
  expensesBalance,
  incomesBalance,
}: HeaderInfoProps) => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const handleAddCategory = () => {
    navigation.navigate("CategoryStack");
  };

  const handleAddTransaction = () => {
    navigation.navigate("CreateTransaction");
  };

  const handleAddRecurrence = () => {
    navigation.navigate("RecurrenceStack");
  };

  const handlePressBalanceInfo = () => {
    navigation.navigate("BalanceInfo");
  };

  const getLabelBalance = useCallback(() => {
    const label = "Saldo atual";
    if (dateFilter) {
      const currentMonthId = Util.getMonthIndex(new Date());
      const monthId = Util.getMonthIndex(new Date(dateFilter));
      if (monthId < currentMonthId) {
        return "Balanço do mês";
      } else if (monthId > currentMonthId) {
        return "Saldo previsto";
      } else {
        return label;
      }
    }
    return label;
  }, [dateFilter]);

  return (
    <View style={styles(theme).container}>
      <View style={styles().containerScrollView}>
        <ScrollMonths
          dateFilter={dateFilter}
          onTapDate={onTapDate}
          onSelect={onFilterDate}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: SCREEN_WIDTH,
        }}>
        <View>
          <TouchableOpacity
            onPress={handlePressBalanceInfo}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Regular color="white" align="center">
              {getLabelBalance()}
            </Regular>
            <Icon
              name="info"
              size={20}
              color={theme.mode}
              style={{ marginLeft: dimens.xtiny }}
            />
          </TouchableOpacity>
          <TextMoney
            size="bigTitle"
            align="center"
            weight="bold"
            value={currentBalance}
            color="white"
            animation
          />
          {/* <Small color="white" align="center">
            Receita - despesa
          </Small> */}
        </View>
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
            <Body color="white">Despesas</Body>
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
        onTapAddRecurrence={handleAddRecurrence}
        onTapAddCategory={handleAddCategory}
        onTapAddTransaction={handleAddTransaction}
      />
    </View>
  );
};

export default HeaderInfo;
