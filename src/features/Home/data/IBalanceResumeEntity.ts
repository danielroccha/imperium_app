import { TRANSACTION_TYPE } from "@app/constants";

export default interface IBalanceResumeEntity {
  balanceResume: IBalance;
  transactions: ITransactionSectionDate[];
}

interface IBalance {
  currentBalance: number;
  monthlyExpenses: number;
  monthlyIncomes: number;
}

interface ITransactionSectionDate {
  section: string;
  data: ITransaction[];
}

interface ITransaction {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  userId: string;
  categoryId: string;
  category: ICategoryEntity;
}

export interface ICategoryEntity {
  id?: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
}
