import { IRecurrenceRepository } from "@app/features/Recurrence/data/recurrenceRepository";
import { EditRecurrenceViewModel } from "@app/features/Recurrence/view/Edit/editRecurrenceViewModel";

const editRecurrenceUseCase = async (
  repository: Pick<IRecurrenceRepository, "editRecurrence">,
  data: EditRecurrenceViewModel,
) => {
  const { categoryId, date, name, type, value, id } = data;
  await repository.editRecurrence({ categoryId, date, name, type, value, id });
};

export { editRecurrenceUseCase };
