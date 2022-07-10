import { useCallback, useState } from "react";

import handleApplicationError from "@app/handles/apiError";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { getTransactionByCategoryUseCase } from "@app/features/Transaction/domain/useCases/getTransactionsGroupByCategoryUseCase";
import { TRANSACTION_TYPE } from "@app/constants";
import ITransactionByCategoryModel from "../../domain/models/ITransactionByCategoryModel";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useTransactionGroupByViewModel = (repository: ITransactionRepository) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ITransactionByCategoryModel[]>();

  const getData = useCallback(
    async (
      transactionType: TRANSACTION_TYPE,
      monthId: number,
      year: number,
    ) => {
      try {
        setLoading(true);
        const result = await getTransactionByCategoryUseCase(
          {
            getTransactionsGroupByCategory:
              repository.getTransactionsGroupByCategory,
          },
          monthId,
          year,
          transactionType,
        );
        setData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },

    [repository.getTransactionsGroupByCategory],
  );

  return { getData, isLoading, data };
};

export { useTransactionGroupByViewModel };
