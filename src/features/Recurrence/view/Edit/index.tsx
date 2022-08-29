import React, { useEffect } from "react";
import { Alert, View } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import I18n from "@app/languages/I18n";

import TransactionForm, {
  TTransactionForm,
} from "@app/features/Transaction/view/Form";
import { useEditRecurrenceViewModel } from "@app/features/Recurrence/view/Edit/editRecurrenceViewModel";
import useRecurrenceRepository from "@app/features/Recurrence/data/recurrenceRepository";
import recurrenceService from "@app/services/recurrence";

import NavBar from "@app/components/organisms/Navbar";

import { colors } from "@app/configs/Theme";
import Loading from "@app/components/molecules/Loading";

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

  const {
    editRecurrence,
    getRecurrence,
    deleteRecurrence,
    recurrence,
    isLoading,
  } = useEditRecurrenceViewModel(recurrenceRepository);

  const handleValidateSuccess = (data: TTransactionForm) => {
    const { category, date, description, transactionType, value } = data;

    editRecurrence({
      categoryId: category?.id ?? "",
      date,
      name: description,
      type: transactionType,
      value,
      id: recurrence?.id ?? "",
    });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      I18n.t("alerts.remove_recurrence_title"),
      I18n.t("alerts.remove_recurrence_description"),
      [
        {
          text: I18n.t("buttons.remove"),
          onPress: () => deleteRecurrence(recurrenceId),
          style: "destructive",
        },
        {
          text: I18n.t("buttons.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
    );
  };

  useEffect(() => {
    getRecurrence(recurrenceId);
  }, [getRecurrence, recurrenceId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar
        title="Editar Recorrencia"
        iconRight="x"
        iconLeft="trash"
        onClickActionRight={handleClose}
        onClickActionLeft={handleDelete}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ backgroundColor: theme.mode }}>
          {recurrence && (
            <TransactionForm
              dataForm={{
                date: recurrence.date,
                category: recurrence.category,
                description: recurrence.name,
                transactionType: recurrence.type,
                value: recurrence.value,
              }}
              loading={isLoading}
              showAdvancedOptions={false}
              onValidateSuccess={handleValidateSuccess}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default EditRecurrence;
