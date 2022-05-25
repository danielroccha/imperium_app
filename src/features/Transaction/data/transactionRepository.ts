import { useCallback } from "react";
import ITransactionEntity from "./ITransactionEntity";
import { TEditCategoryRemote } from "@app/services/category/remoteTypes/EditCategoryRemote";
import { ITransactionService } from "@app/services/transaction";
import { TCreateTransactionRemote } from "@app/services/transaction/remoteTypes/CreateTransactionRemote";

export interface ITransactionRepository {
  createTransaction(data: TCreateTransactionRemote): Promise<void>;
  editCategory(data: TEditCategoryRemote): Promise<void>;
  getTransaction(transactionId: string): Promise<ITransactionEntity>;
  deleteCategory(categoryId: string): Promise<void>;
}

const useTransactionRepository = (
  service: ITransactionService,
): ITransactionRepository => {
  const createTransaction = useCallback(
    async (data: TCreateTransactionRemote) => {
      await service.createTransaction(data);
    },
    [service],
  );

  const editCategory = useCallback(
    async (data: TEditCategoryRemote) => {
      const response = await service.editCategoryService(data);
      return response;
    },
    [service],
  );

  const getTransaction = useCallback(
    async (transactionId: string) => {
      const response = await service.getTransaction(transactionId);
      return response;
    },
    [service],
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      const response = await service.deleteCategoryService(categoryId);
      return response;
    },
    [service],
  );

  return {
    createTransaction,
    editCategory,
    getTransaction,
    deleteCategory,
  };
};

export default useTransactionRepository;
