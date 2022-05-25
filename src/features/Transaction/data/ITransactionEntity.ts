import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";

export default interface ITransactionEntity {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  userId: string;
  categoryId: string;
  category: ICategoryEntity;
}
