import React, { useEffect } from "react";
import { View } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import TransactionForm, {
  TTransactionForm,
} from "@app/features/Transaction/view/Form";
import { useEditRecurrenceViewModel } from "@app/features/Recurrence/view/Edit/editRecurrenceViewModel";
import useRecurrenceRepository from "@app/features/Recurrence/data/recurrenceRepository";
import recurrenceService from "@app/services/recurrence";

import NavBar from "@app/components/organisms/Navbar";

import { colors } from "@app/configs/Theme";

type EditRecurrenceParamList = {
  Detail: {
    recurrenceId: string;
  };
};

const EditRecurrence = () => {
  const theme = colors();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EditRecurrenceParamList>>();
  const { recurrenceId } = route.params;

  const recurrenceRepository = useRecurrenceRepository(recurrenceService);

  const { editRecurrence, getRecurrence, recurrence, isLoading } =
    useEditRecurrenceViewModel(recurrenceRepository);

  const handleValidateSuccess = (data: TTransactionForm) => {
    const { category, date, description, transactionType, value } = data;
  };

  const handleClose = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getRecurrence(recurrenceId);
  }, [getRecurrence, recurrenceId]);

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

export default EditRecurrence;
