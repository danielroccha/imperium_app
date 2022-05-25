import { TRANSACTION_TYPE } from "@app/constants";

export type TCreateRecurrenceRemote = {
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  categoryId: string;
};
