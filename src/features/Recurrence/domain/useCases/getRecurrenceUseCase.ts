import IRecurrenceEntity from "../../data/IRecurrenceEntity";
import { IRecurrenceRepository } from "../../data/recurrenceRepository";
import IRecurrenceModel from "@app/features/Recurrence/domain/models/IRecurrenceModel";

const getRecurrenceUseCase = async (
  repository: Pick<IRecurrenceRepository, "getRecurrence">,
  recurrenceId: string,
) => {
  const recurrence = await repository.getRecurrence(recurrenceId);
  const recurrenceDomain = mapRecurrenceToDomain(recurrence);
  return recurrenceDomain;
};

const mapRecurrenceToDomain = (
  recurrence: IRecurrenceEntity,
): IRecurrenceModel => ({
  categoryId: recurrence.categoryId,
  date: recurrence.date,
  id: recurrence.id,
  name: recurrence.name,
  type: recurrence.type,
  userId: recurrence.userId,
  value: recurrence.value,
});
export { getRecurrenceUseCase };
