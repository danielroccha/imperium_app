import ITransactionEntity from "@app/features/Transaction/data/ITransactionEntity";

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
  data: ITransactionEntity[];
}
