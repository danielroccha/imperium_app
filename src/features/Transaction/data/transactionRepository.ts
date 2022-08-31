import { useCallback } from "react";
import ITransactionEntity from "./ITransactionEntity";
import { ITransactionService } from "@app/services/transaction";
import { TCreateTransactionRemote } from "@app/services/transaction/remoteTypes/CreateTransactionRemote";
import { TRANSACTION_TYPE } from "@app/constants";
import ITransactionByCategoryEntity from "./ITransactionsByCategoryEntity";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";
import { TEditTransactionRemote } from "@app/services/transaction/remoteTypes/EditTransactionRemote";
import { TDeleteHeaderTransaction } from "@app/services/transaction/remoteTypes/DeleteTransactionRemote";
import Util from "@app/util";

export interface ITransactionRepository {
  createTransaction(data: TCreateTransactionRemote): Promise<void>;
  editTransaction(data: TEditTransactionRemote): Promise<void>;
  getTransaction(transactionId: string): Promise<ITransactionEntity>;
  deleteTransaction(
    transactionId: string,
    headers?: TDeleteHeaderTransaction,
  ): Promise<void>;
  getTransactionsGroupByCategory(
    monthId: number,
    year: number,
    transactionType: TRANSACTION_TYPE,
  ): Promise<ITransactionByCategoryEntity[]>;
  getBalanceResume(
    monthId: number,
    year: number,
  ): Promise<IBalanceResumeEntity>;
}

const useTransactionRepository = (
  service: ITransactionService,
): ITransactionRepository => {
  const createTransaction = useCallback(
    async (data: TCreateTransactionRemote) => {
      await service.createTransactionService(data);
    },
    [service],
  );

  const editTransaction = useCallback(
    async (data: TEditTransactionRemote) => {
      const response = await service.editTransactionService(data);
      return response;
    },
    [service],
  );

  const getTransaction = useCallback(
    async (transactionId: string) => {
      const response = await service.getTransactionService(transactionId);
      return response;
    },
    [service],
  );

  const deleteTransaction = useCallback(
    async (transactionId: string, headers?: TDeleteHeaderTransaction) => {
      const response = await service.deleteTransactionService(
        transactionId,
        headers,
      );
      return response;
    },
    [service],
  );

  const getTransactionsGroupByCategory = useCallback(
    async (
      monthId: number,
      year: number,
      transactionType: TRANSACTION_TYPE,
    ) => {
      const response = await service.getTransactionsGroupByCategory(
        monthId,
        year,
        transactionType,
        Util.getTimezoneOffset(),
      );
      return response;
    },
    [service],
  );

  const getBalanceResume = useCallback(
    async (monthId: number, year: number) => {
      const response = await service.getBalanceService(
        monthId,
        year,
        Util.getTimezoneOffset(),
      );
      return response;
    },
    [service],
  );

  return {
    createTransaction,
    editTransaction,
    getTransaction,
    deleteTransaction,
    getTransactionsGroupByCategory,
    getBalanceResume,
  };
};

export default useTransactionRepository;
