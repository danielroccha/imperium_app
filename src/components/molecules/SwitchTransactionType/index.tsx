import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Body, Caption } from "@app/components/atoms/Text";
import styles from "./styles";
import { colors, dimens } from "@app/configs/Theme";
import { TRANSACTION_TYPE } from "@app/constants";
import { ColorsPropType } from "@app/types/ThemeType";

type SwitchTransactionTypeProps = {
  onChange: (value: TRANSACTION_TYPE) => void;
  error?: boolean;
  text?: string;
  value?: TRANSACTION_TYPE;
  disableSwitchTypeTransaction?: boolean;
  showLabel?: boolean;
  colorLabel?: ColorsPropType;
};

const SwitchTransactionType = ({
  onChange,
  error,
  text = "Escolha o tipo",
  value,
  disableSwitchTypeTransaction,
  showLabel = false,
  colorLabel,
}: SwitchTransactionTypeProps) => {
  const theme = colors();

  const [transactionType, setTransationType] = useState<
    TRANSACTION_TYPE | undefined
  >(value);

  const handlePressExpenseButton = useCallback(() => {
    setTransationType(TRANSACTION_TYPE.EXPENSE);
    onChange(TRANSACTION_TYPE.EXPENSE);
  }, [onChange]);

  const handlePressIncomeButton = useCallback(() => {
    setTransationType(TRANSACTION_TYPE.INCOME);
    onChange(TRANSACTION_TYPE.INCOME);
  }, [onChange]);

  const getColorExpense = useCallback(() => {
    if (transactionType === TRANSACTION_TYPE.EXPENSE) {
      return theme.danger;
    } else {
      return theme.white;
    }
  }, [theme.white, theme.danger, transactionType]);

  const getColorIncome = useCallback(() => {
    if (transactionType === TRANSACTION_TYPE.INCOME) {
      return theme.green;
    } else {
      return theme.white;
    }
  }, [theme.white, theme.green, transactionType]);

  const getColorLabel = () => {
    if (colorLabel) {
      return colorLabel;
    } else if (error) {
      return "danger";
    } else {
      return "contrast";
    }
  };

  useEffect(() => {
    if (value) {
      setTransationType(value);
    }
  }, [value]);

  return (
    <View>
      <View style={{ marginVertical: dimens.small }}>
        {!disableSwitchTypeTransaction && showLabel && (
          <Body align="center" color={getColorLabel()}>
            {text}
          </Body>
        )}
      </View>
      <View style={styles(theme).container}>
        <TouchableOpacity
          disabled={disableSwitchTypeTransaction}
          style={[
            styles(theme).expenseButton,
            {
              backgroundColor: getColorExpense(),
            },
          ]}
          onPress={handlePressExpenseButton}>
          <Body
            align="center"
            color={
              transactionType === TRANSACTION_TYPE.EXPENSE ? "white" : "black"
            }>
            Despesa
          </Body>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableSwitchTypeTransaction}
          style={[
            styles(theme).incomeButton,
            {
              backgroundColor: getColorIncome(),
            },
          ]}
          onPress={handlePressIncomeButton}>
          <Body
            align="center"
            color={
              transactionType === TRANSACTION_TYPE.INCOME ? "white" : "black"
            }>
            Receita
          </Body>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwitchTransactionType;
