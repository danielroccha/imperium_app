import React, { useEffect } from "react";
import { View, Alert } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import I18n from "@app/languages/I18n";

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
  const {
    editTransaction,
    getTransaction,
    deleteTransaction,
    transactionData,
    isLoading,
  } = useEditTransactionViewModel(transactionRespository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleValidateSuccess = (data: TTransactionForm) => {
    const {
      category,
      description,
      value,
      date,
      transactionType,
      repeat,
      repeatType,
    } = data;

    let isInstallment = false;

    if (repeat && repeatType) {
      isInstallment = true;
    }

    if (category) {
      editTransaction({
        category,
        categoryId: category.id,
        date,
        id: transactionId,
        name: description,
        type: transactionType,
        value,
        isInstallment,
      });
    }
  };

  const handleDelete = () => {
    if (transactionData?.isInstallment) {
      showDeleteTransactionInstallmentAlert();
    } else {
      showDeleteTransactionAlert();
    }
  };

  const showDeleteTransactionAlert = () => {
    Alert.alert(
      I18n.t("alerts.remove_transaction_title"),
      I18n.t("alerts.remove_transaction_description"),
      [
        {
          text: I18n.t("buttons.remove"),
          onPress: () => {
            if (transactionData && transactionData.id) {
              deleteTransaction(transactionData.id);
            }
          },
          style: "destructive",
        },
        {
          text: I18n.t("buttons.cancel"),
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ],
    );
  };

  const showDeleteTransactionInstallmentAlert = () => {
    Alert.alert(
      I18n.t("alerts.remove_transaction_title"),
      I18n.t("alerts.remove_transaction_description"),
      [
        {
          text: I18n.t("alerts.remove_transaction_installments"),
          onPress: () => {
            if (transactionData && transactionData.id) {
              deleteTransaction(transactionData.id, {
                transactionDate: transactionData.date.toLocaleString(),
                deleteAll: true,
              });
            }
          },
          style: "destructive",
        },
        {
          text: I18n.t("alerts.remove_transaction_installments_only"),
          onPress: () => {
            if (transactionData && transactionData.id) {
              deleteTransaction(transactionData.id);
            }
          },
        },
        {
          text: I18n.t("buttons.remove"),
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ],
    );
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
          title="Editar transação"
          onClickActionRight={handleClose}
          onClickActionLeft={handleDelete}
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
