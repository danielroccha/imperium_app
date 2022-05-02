import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";

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
  section: { date: string; value: number };
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
