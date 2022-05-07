import { TRANSACTION_TYPE } from "@app/constants";

export type TEditCategoryRemote = {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TRANSACTION_TYPE;
};
