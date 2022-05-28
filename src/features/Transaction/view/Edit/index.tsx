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
import Loading from "@app/components/molecules/Loading";

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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {transactionData && (
              <TransactionForm
                dataForm={{
                  value: transactionData.value,
                  date: transactionData.date,
                  transactionType: transactionData.type,
                  description: transactionData.name,
                  category: transactionData.category,
                }}
                edit
                showAdvancedOptions={false}
                onValidateSuccess={handleValidateSuccess}
                loading={isLoading}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default EditTransaction;
