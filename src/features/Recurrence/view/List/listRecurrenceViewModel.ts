import { useCallback, useState } from "react";

import { deleteRecurrenceUseCase } from "@app/features/Recurrence/domain/useCases/deleteRecurrenceUseCase";

import { handleError } from "@app/configs/api";
import { IRecurrenceRepository } from "../../data/recurrenceRepository";
import { listRecurrencesUseCase } from "../../domain/useCases/listRecurrencesUseCase";
import IRecurrenceModel from "../../domain/models/IRecurrenceModel";

const useListRecurrenceViewModel = (repository: IRecurrenceRepository) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listRecurrencesData, setListRecurrencesData] =
    useState<IRecurrenceModel[]>();

  const getRecurrences = useCallback(
    async (refresh?: boolean) => {
      try {
        refresh ? setIsRefreshing(true) : setLoading(true);
        const listRecurrences = await listRecurrencesUseCase({
          listRecurrences: repository.listRecurrences,
        });
        setListRecurrencesData(listRecurrences);
        refresh ? setIsRefreshing(false) : setLoading(false);
      } catch (error) {
        refresh ? setIsRefreshing(false) : setLoading(false);
        handleError(error);
      }
    },
    [repository.listRecurrences],
  );

  const deleteRecurrence = useCallback(
    async (recurrenceId: string) => {
      try {
        await deleteRecurrenceUseCase(
          {
            deleteRecurrence: repository.deleteRecurrence,
          },
          recurrenceId,
        );
        getRecurrences();
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },
    [repository.deleteRecurrence, getRecurrences],
  );

  return {
    getRecurrences,
    deleteRecurrence,
    isLoading,
    listRecurrencesData,
    isRefreshing,
  };
};

export { useListRecurrenceViewModel };
