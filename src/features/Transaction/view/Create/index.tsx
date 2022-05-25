import React from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import TransactionForm, {
  TTransactionForm,
} from "@app/features/Transaction/view/Form";
import { useCreateTransactionViewModel } from "@app/features/Transaction/view/Create/createTransactionViewModel";
import useTransactionRepository from "@app/features/Transaction/data/transactionRepository";

import transactionService from "@app/services/transaction";

import NavBar from "@app/components/organisms/Navbar";
import { colors } from "@app/configs/Theme";

const CreateTransaction = () => {
  const navigation = useNavigation();
  const theme = colors();

  const transactionRespository = useTransactionRepository(transactionService);
  const { createTransaction, isLoading } = useCreateTransactionViewModel(
    transactionRespository,
  );

  const handleClose = () => {
    navigation.goBack();
  };

  const handleValidateSuccess = (data: TTransactionForm) => {
    const {
      category,
      date,
      description,
      transactionType,
      value,
      repeat,
      repeatType,
    } = data;

    let isInstallment = false;

    if (repeat && repeatType) {
      isInstallment = true;
    }

    createTransaction({
      categoryId: category.id,
      date,
      isInstallment,
      name: description,
      type: transactionType,
      value,
      repeat,
      repeatType,
    });
  };

  return (
    <>
      <View
        style={{
          backgroundColor: theme.mode,
          flex: 1,
        }}>
        <NavBar iconRight="x" onClickActionRight={handleClose} />
        <TransactionForm
          onValidateSuccess={handleValidateSuccess}
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default CreateTransaction;
