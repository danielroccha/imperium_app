import { IRecurrenceRepository } from "@app/features/Recurrence/data/recurrenceRepository";
import { CreateRecurrenceViewModel } from "../../view/Create/createRecurrenceViewModel";

const createRecurrenceUseCase = async (
  repository: Pick<IRecurrenceRepository, "createRecurrence">,
  data: CreateRecurrenceViewModel,
) => {
  const { categoryId, date, name, type, value } = data;
  await repository.createRecurrence({ categoryId, date, name, type, value });
};

export { createRecurrenceUseCase };
