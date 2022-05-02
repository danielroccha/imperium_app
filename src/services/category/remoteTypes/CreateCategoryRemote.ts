import { TRANSACTION_TYPE } from "@app/constants";

export type TCreateCategoryRemote = {
  name: string;
  icon: string;
  color: string;
  type: TRANSACTION_TYPE;
};
