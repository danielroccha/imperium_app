import React, { useEffect } from "react";
import { View } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import TransactionForm, {
  TTransactionForm,
} from "@app/features/Transaction/view/Form";
import useTransactionRepository from "@app/features/Transaction/data/transactionRepository";

import transactionService from "@app/services/transaction";

import NavBar from "@app/components/organisms/Navbar";
import { colors } from "@app/configs/Theme";
import { useEditTransactionViewModel } from "./editTransactionViewModel";

type EditTransactionParamList = {
  Detail: {
    transactionId: string;
  };
};

const EditTransaction = () => {
  const navigation = useNavigation();
  const theme = colors();
  const route = useRoute<RouteProp<EditTransactionParamList>>();
  const { transactionId } = route.params;

  const transactionRespository = useTransactionRepository(transactionService);
  const { editTransaction, getTransaction, transactionData, isLoading } =
    useEditTransactionViewModel(transactionRespository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleValidateSuccess = (data: TTransactionForm) => {
    const { category, date, description, transactionType, value } = data;

    console.log();
  };

  useEffect(() => {
    getTransaction(transactionId);
  }, [getTransaction, transactionId]);

  return (
    <>
      <View
        style={{
          backgroundColor: theme.mode,
          flex: 1,
        }}>
        <NavBar
          iconRight="x"
          iconLeft="trash"
          onClickActionRight={handleClose}
        />
        <TransactionForm
          onValidateSuccess={handleValidateSuccess}
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default EditTransaction;
