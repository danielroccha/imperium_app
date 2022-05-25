import { TRANSACTION_TYPE } from "@app/constants";

export default interface IRecurrenceEntity {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  userId: string;
  categoryId: string;
}
