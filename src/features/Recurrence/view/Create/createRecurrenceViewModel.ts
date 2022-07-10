import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { createRecurrenceUseCase } from "@app/features/Recurrence/domain/useCases/createRecurrenceUseCase";
import { IRecurrenceRepository } from "@app/features/Recurrence/data/recurrenceRepository";

import handleApplicationError from "@app/handles/apiError";
import { TRANSACTION_TYPE } from "@app/constants";

export type CreateRecurrenceViewModel = {
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  categoryId: string;
};

const useCreateRecurrenceViewModel = (repository: IRecurrenceRepository) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const createRecurrence = useCallback(
    async (data: CreateRecurrenceViewModel) => {
      try {
        setLoading(true);
        await createRecurrenceUseCase(
          { createRecurrence: repository.createRecurrence },
          data,
        );
        navigation.goBack();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error, "ALERT");
      }
    },
    [repository.createRecurrence, navigation],
  );

  return { createRecurrence, isLoading };
};

export { useCreateRecurrenceViewModel };
