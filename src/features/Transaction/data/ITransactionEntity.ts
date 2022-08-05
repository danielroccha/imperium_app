import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";
import IRecurrenceEntity from "@app/features/Recurrence/data/IRecurrenceEntity";

export default interface ITransactionEntity {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  isRecurrence: boolean;
  userId: string;
  categoryId: string;
  category: ICategoryEntity;
  recurrence?: IRecurrenceEntity;
  isInstallment: boolean;
}
