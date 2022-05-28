import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { getRecurrenceUseCase } from "@app/features/Recurrence/domain/useCases/getRecurrenceUseCase";
import { IRecurrenceRepository } from "@app/features/Recurrence/data/recurrenceRepository";
import { editRecurrenceUseCase } from "@app/features/Recurrence/domain/useCases/editRecurrenceUseCase";

import { handleError } from "@app/configs/api";
import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

export type EditRecurrenceViewModel = {
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  categoryId: string;
  category?: ICategoryModel;
  id: string;
};

const useEditRecurrenceViewModel = (repository: IRecurrenceRepository) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [recurrence, setRecurrence] = useState<EditRecurrenceViewModel>();

  const editRecurrence = useCallback(
    async (data: EditRecurrenceViewModel) => {
      try {
        setLoading(true);
        await editRecurrenceUseCase(
          { editRecurrence: repository.editRecurrence },
          data,
        );
        navigation.goBack();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },
    [repository.editRecurrence, navigation],
  );

  const getRecurrence = useCallback(
    async (recurrenceId: string) => {
      try {
        setLoading(true);
        const recurrenceData = await getRecurrenceUseCase(
          { getRecurrence: repository.getRecurrence },
          recurrenceId,
        );
        setRecurrence(recurrenceData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },
    [repository.getRecurrence],
  );

  return { getRecurrence, editRecurrence, isLoading, recurrence };
};

export { useEditRecurrenceViewModel };
