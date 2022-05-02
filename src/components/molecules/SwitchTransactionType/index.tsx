import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Body, Caption } from "@app/components/atoms/Text";
import styles from "./styles";
import { colors, dimens } from "@app/configs/Theme";
import { TRANSACTION_TYPE } from "@app/constants";

type SwitchTransactionTypeProps = {
  onChange: (value: TRANSACTION_TYPE) => void;
  error?: boolean;
  text: string;
};

const SwitchTransactionType = ({
  onChange,
  error,
  text = "Escolha uma categoria",
}: SwitchTransactionTypeProps) => {
  const theme = colors();

  const [transactionType, setTransationType] = useState<TRANSACTION_TYPE>();

  const handlePressExpenseButton = () => {
    setTransationType(TRANSACTION_TYPE.EXPENSE);
    onChange(TRANSACTION_TYPE.EXPENSE);
  };

  const handlePressIncomeButton = () => {
    setTransationType(TRANSACTION_TYPE.INCOME);
    onChange(TRANSACTION_TYPE.INCOME);
  };

  const getColorExpense = () => {
    if (transactionType === TRANSACTION_TYPE.EXPENSE) {
      return theme.danger;
    } else {
      return theme.white;
    }
  };
  const getColorIncome = () => {
    if (transactionType === TRANSACTION_TYPE.INCOME) {
      return theme.green;
    } else {
      return theme.white;
    }
  };

  return (
    <>
      <View style={{ marginVertical: dimens.small }}>
        <Body align="center">{text}</Body>
        {error && (
          <Caption align="center" color="danger">
            Escolha uma categoria
          </Caption>
        )}
      </View>
      <View style={styles(theme).container}>
        <TouchableOpacity
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
            Gasto
          </Body>
        </TouchableOpacity>
        <TouchableOpacity
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
    </>
  );
};

export default SwitchTransactionType;
