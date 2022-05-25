import { IRecurrenceRepository } from "@app/features/Recurrence/data/recurrenceRepository";

const deleteRecurrenceUseCase = async (
  repository: Pick<IRecurrenceRepository, "deleteRecurrence">,
  recurrenceId: string,
) => {
  await repository.deleteRecurrence(recurrenceId);
};

export { deleteRecurrenceUseCase };
