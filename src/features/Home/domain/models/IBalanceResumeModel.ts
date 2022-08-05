import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import IRecurrenceModel from "@app/features/Recurrence/domain/models/IRecurrenceModel";

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
  section: { date: string; value: number };
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
  isRecurrence: boolean;
  category: ICategoryModel;
  recurrence?: IRecurrenceModel;
  isInstallment: boolean;
}
