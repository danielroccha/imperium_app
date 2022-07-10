import { useCallback, useState } from "react";

import handleApplicationError from "@app/handles/apiError";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { getBalanceResumeUseCase } from "@app/features/Home/domain/useCases/getBalanceResumeUseCase";
import IBalanceResumeModel from "@app/features/Home/domain/models/IBalanceResumeModel";
import { deleteTransactionUseCase } from "@app/features/Transaction/domain/useCases/deleteTransactionUseCase";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useHomeViewModel = (repository: ITransactionRepository) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IBalanceResumeModel>();

  const getData = useCallback(
    async (monthId: number, year: number) => {
      try {
        setLoading(true);
        const balanceResumeData = await getBalanceResumeUseCase(
          { getBalanceResume: repository.getBalanceResume },
          monthId,
          year,
        );
        setData(balanceResumeData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },

    [repository.getBalanceResume],
  );

  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      try {
        setLoading(true);
        await deleteTransactionUseCase(
          { deleteTransaction: repository.deleteTransaction },
          transactionId,
        );
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [repository.deleteTransaction],
  );

  return { getData, isLoading, data, deleteTransaction };
};

export { useHomeViewModel };
