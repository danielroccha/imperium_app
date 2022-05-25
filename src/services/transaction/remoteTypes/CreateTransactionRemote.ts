import { OPTIONS_PERIOD, TRANSACTION_TYPE } from "@app/constants";

export type TCreateTransactionRemote = {
  name: string;
  value: number;
  date: Date;
  isInstallment: boolean;
  type: TRANSACTION_TYPE;
  categoryId: string;
  repeat?: number;
  repeatType?: OPTIONS_PERIOD;
};
