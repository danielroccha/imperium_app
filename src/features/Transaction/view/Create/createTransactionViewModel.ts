import { useCallback, useState } from "react";

import { createTransactionUseCase } from "@app/features/Transaction/domain/useCases/createTransactionUseCase";
import { useNavigation } from "@react-navigation/native";
import { OPTIONS_PERIOD, TRANSACTION_TYPE } from "@app/constants";
import handleApplicationError from "@app/handles/apiError";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import RootStackNavigation from "@app/types/RootStackParams";

export type TCreateTransactionViewModel = {
  name: string;
  value: number;
  date: Date;
  isInstallment: boolean;
  type: TRANSACTION_TYPE;
  categoryId: string;
  repeat?: number;
  repeatType?: OPTIONS_PERIOD;
};

const useCreateTransactionViewModel = (repository: ITransactionRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const createTransaction = useCallback(
    async (data: TCreateTransactionViewModel) => {
      try {
        setLoading(true);
        await createTransactionUseCase(
          { createTransaction: repository.createTransaction },
          data,
        );
        navigation.goBack();
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.createTransaction],
  );

  return { createTransaction, isLoading };
};

export { useCreateTransactionViewModel };
