import { TRANSACTION_TYPE } from "@app/constants";

export default interface IBalanceResumeModel {
  balanceResume: IBalanceModel;
  transactions: ITransactionSectionDateModel[];
}

interface IBalanceModel {
  currentBalance: number;
  monthlyExpenses: number;
  monthlyIncomes: number;
}

export interface ITransactionSectionDateModel {
  section: string;
  data: ITransactionModel[];
}

export interface ITransactionModel {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: TRANSACTION_TYPE;
  userId: string;
  categoryId: string;
  category: ICategoryModel;
}

export interface ICategoryModel {
  id?: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
}
