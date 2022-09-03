import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import I18n from "@app/languages/I18n";

import ScrollMonths from "@app/components/molecules/ScrollMonths";
import { Regular, Body, Small } from "@app/components/atoms/Text";
import { colors, dimens, SCREEN_WIDTH } from "@app/configs/Theme";
import SectionOptions from "@app/components/organisms/SectionOptions";
import styles from "./styles";
import TextMoney from "@app/components/atoms/TextMoney";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";
import { MONTH_PERIOD, TRANSACTION_TYPE } from "@app/constants";

type HeaderInfoProps = {
  onFilterDate: (date: Date) => void;
  onResetDate: () => void;
  onTapDate: () => void;
  onConsiderFutureTransactions: () => void;
  considerFutureTransactions: boolean;
  dateFilter?: Date;
  currentBalance: number;
  expensesBalance: number;
  incomesBalance: number;
};

const HeaderInfo = ({
  onFilterDate,
  onTapDate,
  onResetDate,
  onConsiderFutureTransactions,
  considerFutureTransactions,
  dateFilter,
  currentBalance,
  expensesBalance,
  incomesBalance,
}: HeaderInfoProps) => {
  const [monthPeriod, setMonthPeriod] = useState<MONTH_PERIOD>("CURRENT");
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

  const handlePressExpenses = () => {
    if (dateFilter) {
      navigation.navigate("TransactionGroupByCategory", {
        transactionType: TRANSACTION_TYPE.EXPENSE,
        monthId: Util.getMonthIndex(dateFilter),
        year: dateFilter.getFullYear(),
      });
    }
  };
  const handlePressIncomes = () => {
    if (dateFilter) {
      navigation.navigate("TransactionGroupByCategory", {
        transactionType: TRANSACTION_TYPE.INCOME,
        monthId: Util.getMonthIndex(dateFilter),
        year: dateFilter.getFullYear(),
      });
    }
  };

  const getLabelBalance = useCallback(() => {
    switch (monthPeriod) {
      case "CURRENT":
        return I18n.t("home.current_balance");
      case "NEXT":
        return I18n.t("home.balance_forecast");

      default:
        return I18n.t("home.month_balance");
    }
  }, [monthPeriod]);

  useEffect(() => {
    if (dateFilter) {
      const date = new Date();
      const currentMonthId = Util.getMonthIndex(date);
      const monthIdFilter = Util.getMonthIndex(dateFilter);

      const currentYear = date.getFullYear();
      const yearFilter = dateFilter.getFullYear();

      if (monthIdFilter === currentMonthId && yearFilter === currentYear) {
        setMonthPeriod("CURRENT");
      } else if (
        (monthIdFilter < currentMonthId && yearFilter <= currentYear) ||
        yearFilter < currentYear
      ) {
        setMonthPeriod("PREVIOUS");
      } else {
        setMonthPeriod("NEXT");
      }
    }
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
        </View>
      </View>
      {monthPeriod === "CURRENT" ? (
        <Small
          color="white"
          style={{ textDecorationLine: "underline" }}
          onPress={onConsiderFutureTransactions}>
          {considerFutureTransactions
            ? I18n.t("home.consider_future_transactions").toUpperCase()
            : I18n.t("home.remove_future_transactions").toUpperCase()}
        </Small>
      ) : (
        <Small
          color="white"
          style={{ textDecorationLine: "underline" }}
          onPress={onResetDate}>
          {I18n.t("home.back_to_current_month").toUpperCase()}
        </Small>
      )}
      <View style={styles(theme).containerTransactionType}>
        <TouchableOpacity onPress={handlePressIncomes}>
          <View style={styles(theme).transactionTypeContainerTitle}>
            <View
              style={[
                styles(theme).containerIcon,
                { backgroundColor: theme.green },
              ]}>
              <Icon name="dollar-sign" size={18} color={theme.mode} />
            </View>
            <Body color="white">{I18n.t("common.incomes")}</Body>
          </View>
          <TextMoney
            size="body"
            align="center"
            weight="bold"
            value={incomesBalance}
            color="white"
            animation
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressExpenses}>
          <View style={styles(theme).transactionTypeContainerTitle}>
            <View
              style={[
                styles(theme).containerIcon,
                { backgroundColor: theme.danger },
              ]}>
              <Icon name="arrow-down-left" size={18} color={theme.mode} />
            </View>
            <Body color="white">{I18n.t("common.expenses")}</Body>
          </View>
          <TextMoney
            size="body"
            align="center"
            weight="bold"
            value={expensesBalance}
            color="white"
            animation
          />
        </TouchableOpacity>
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
