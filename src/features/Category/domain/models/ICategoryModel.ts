import { TRANSACTION_TYPE } from "@app/constants";

export interface ICategoryModel {
  id: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
  type: TRANSACTION_TYPE;
}
