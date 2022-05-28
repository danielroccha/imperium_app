import { useCallback, useState } from "react";

import { createTransactionUseCase } from "@app/features/Transaction/domain/useCases/createTransactionUseCase";
import { useNavigation } from "@react-navigation/native";
import { TRANSACTION_TYPE } from "@app/constants";
import { handleError } from "@app/configs/api";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import RootStackNavigation from "@app/types/RootStackParams";
import { getTransactionUseCase } from "../../domain/useCases/getTransactionUseCase";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

export type TEditTransactionViewModel = {
  name: string;
  value: number;
  date: Date;
  isInstallment: boolean;
  type: TRANSACTION_TYPE;
  categoryId: string;
  category: ICategoryModel;
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
          categoryId: result.categoryId,
          date: result.date,
          isInstallment: false,
          name: result.name,
          type: result.type,
          value: result.value,
          category: result.category,
        });
        setLoading(false);
      } catch (error) {
        handleError(error);
        setLoading(false);
      }
    },

    [repository.getTransaction],
  );

  const editTransaction = useCallback(
    async (data: TEditTransactionViewModel) => {
      try {
        setLoading(true);
        await createTransactionUseCase(
          { createTransaction: repository.createTransaction },
          data,
        );
        navigation.goBack();
      } catch (error) {
        handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.createTransaction],
  );

  return { editTransaction, getTransaction, isLoading, transactionData };
};

export { useEditTransactionViewModel };
