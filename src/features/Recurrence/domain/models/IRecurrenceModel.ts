import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import { TRANSACTION_TYPE } from "../../../../constants";

export default interface IRecurrenceModel {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  userId: string;
  categoryId: string;
  category?: ICategoryModel;
}
