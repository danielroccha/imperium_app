import React from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import TransactionForm, {
  TTransactionForm,
} from "@app/features/Transaction/view/Form";
import useRecurrenceRepository from "@app/features/Recurrence/data/recurrenceRepository";
import recurrenceService from "@app/services/recurrence";

import NavBar from "@app/components/organisms/Navbar";

import { colors } from "@app/configs/Theme";
import { useCreateRecurrenceViewModel } from "./createRecurrenceViewModel";

const CreateRecurrence = () => {
  const theme = colors();
  const navigation = useNavigation();

  const recurrenceRepository = useRecurrenceRepository(recurrenceService);

  const { createRecurrence, isLoading } =
    useCreateRecurrenceViewModel(recurrenceRepository);

  const handleValidateSuccess = (data: TTransactionForm) => {
    const { category, date, description, transactionType, value } = data;
    createRecurrence({
      categoryId: category.id,
      date,
      name: description,
      type: transactionType,
      value,
    });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar
        title="Cadastrar Recorrencia"
        iconRight="x"
        onClickActionRight={handleClose}
      />
      <View style={{ backgroundColor: theme.mode }}>
        <TransactionForm
          loading={isLoading}
          showAdvancedOptions={false}
          onValidateSuccess={handleValidateSuccess}
        />
      </View>
    </View>
  );
};

export default CreateRecurrence;
