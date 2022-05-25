import IRecurrenceEntity from "../../data/IRecurrenceEntity";
import { IRecurrenceRepository } from "../../data/recurrenceRepository";
import IRecurrenceModel from "@app/features/Recurrence/domain/models/IRecurrenceModel";

const listRecurrencesUseCase = async (
  repository: Pick<IRecurrenceRepository, "listRecurrences">,
) => {
  const recurrences = await repository.listRecurrences();
  const recurrencesDomain = mapRecurrencesToDomain(recurrences);
  return recurrencesDomain;
};

const mapRecurrencesToDomain = (
  recurrences: IRecurrenceEntity[],
): IRecurrenceModel[] =>
  recurrences.map((recurrence): IRecurrenceModel => recurrence);

export { listRecurrencesUseCase };
