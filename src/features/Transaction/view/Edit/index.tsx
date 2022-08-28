import React, { useEffect } from "react";
import { View, Alert } from "react-native";

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
      "Remover lançamento",
      "Tem certeza que deseja remover esse lançamento ?",
      [
        {
          text: "Remover",
          onPress: () => {
            if (transactionData && transactionData.id) {
              deleteTransaction(transactionData.id);
            }
          },
          style: "destructive",
        },
        {
          text: "Cancelar",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ],
    );
  };

  const showDeleteTransactionInstallmentAlert = () => {
    Alert.alert(
      "Apagar lançamento",
      "Tem certeza que deseja remover esse lançamento ?",
      [
        {
          text: "Remover todas a partir desta",
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
          text: "Remover apenas esta",
          onPress: () => {
            if (transactionData && transactionData.id) {
              deleteTransaction(transactionData.id);
            }
          },
        },
        {
          text: "Cancelar",
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
