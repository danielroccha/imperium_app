import { useCallback } from "react";
import { IRecurrenceService } from "@app/services/recurrence";
import IRecurrenceEntity from "@app/features/Recurrence/data/IRecurrenceEntity";
import { TCreateRecurrenceRemote } from "@app/services/recurrence/remoteTypes/CreateRecurrenceRemote";
import { TEditRecurrenceRemote } from "@app/services/recurrence/remoteTypes/EditRecurrenceRemote";

export interface IRecurrenceRepository {
  listRecurrences(): Promise<IRecurrenceEntity[]>;
  createRecurrence(data: TCreateRecurrenceRemote): Promise<void>;
  editRecurrence(data: TEditRecurrenceRemote): Promise<void>;
  getRecurrence(recurrenceId: string): Promise<IRecurrenceEntity>;
  deleteRecurrence(recurrenceId: string): Promise<void>;
}

const useRecurrenceRepository = (
  service: IRecurrenceService,
): IRecurrenceRepository => {
  const listRecurrences = useCallback(async () => {
    const response = await service.listRecurrencesService();
    return response;
  }, [service]);

  const createRecurrence = useCallback(
    async (data: TCreateRecurrenceRemote) => {
      const response = await service.createRecurrenceService(data);
      return response;
    },
    [service],
  );

  const editRecurrence = useCallback(
    async (data: TEditRecurrenceRemote) => {
      const response = await service.editCategoryService(data);
      return response;
    },
    [service],
  );

  const getRecurrence = useCallback(
    async (recurrenceId: string) => {
      const response = await service.getRecurrenceService(recurrenceId);
      return response;
    },
    [service],
  );

  const deleteRecurrence = useCallback(
    async (categoryId: string) => {
      const response = await service.deleteRecurrenceService(categoryId);
      return response;
    },
    [service],
  );

  return {
    listRecurrences,
    createRecurrence,
    editRecurrence,
    getRecurrence,
    deleteRecurrence,
  };
};

export default useRecurrenceRepository;
