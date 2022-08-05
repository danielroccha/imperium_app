import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { editTransactionUseCase } from "@app/features/Transaction/domain/useCases/editTransactionUseCase";
import { getTransactionUseCase } from "@app/features/Transaction/domain/useCases/getTransactionUseCase";
import { deleteTransactionUseCase } from "@app/features/Transaction/domain/useCases/deleteTransactionUseCase";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

import RootStackNavigation from "@app/types/RootStackParams";
import { TRANSACTION_TYPE } from "@app/constants";
import handleApplicationError from "@app/handles/apiError";

export type TEditTransactionViewModel = {
  name: string;
  value: number;
  date: Date;
  isInstallment: boolean;
  type: TRANSACTION_TYPE;
  categoryId: string;
  category: ICategoryModel;
  id: string;
};

export type TDelteTransactionOptions = {
  deleteAll: boolean;
  transactionDate: string;
};

const useEditTransactionViewModel = (repository: ITransactionRepository) => {
  const [isLoading, setLoading] = useState(false);
  const [transactionData, setTransactionData] =
    useState<TEditTransactionViewModel>();
  const navigation = useNavigation<RootStackNavigation>();

  const getTransaction = useCallback(
    async (transactionId: string) => {
      try {
        setLoading(true);
        const result = await getTransactionUseCase(
          { getTransaction: repository.getTransaction },
          transactionId,
        );

        setTransactionData({
          id: result.id,
          categoryId: result.categoryId,
          date: result.date,
          isInstallment: result.isInstallment,
          name: result.name,
          type: result.type,
          value: result.value,
          category: result.category,
        });
        setLoading(false);
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [repository.getTransaction],
  );

  const editTransaction = useCallback(
    async (data: TEditTransactionViewModel) => {
      try {
        setLoading(true);
        await editTransactionUseCase(
          { editTransaction: repository.editTransaction },
          data,
        );
        navigation.goBack();
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.editTransaction],
  );

  const deleteTransaction = useCallback(
    async (transactionId: string, options?: TDelteTransactionOptions) => {
      try {
        setLoading(true);
        await deleteTransactionUseCase(
          { deleteTransaction: repository.deleteTransaction },
          transactionId,
          options,
        );
        navigation.goBack();
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.deleteTransaction],
  );

  return {
    editTransaction,
    getTransaction,
    deleteTransaction,
    isLoading,
    transactionData,
  };
};

export { useEditTransactionViewModel };
