import { useCallback, useState } from "react";

import handleApplicationError from "@app/handles/apiError";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { getBalanceResumeUseCase } from "@app/features/Home/domain/useCases/getBalanceResumeUseCase";
import IBalanceResumeModel from "@app/features/Home/domain/models/IBalanceResumeModel";
import { deleteTransactionUseCase } from "@app/features/Transaction/domain/useCases/deleteTransactionUseCase";
import { TDelteTransactionOptions } from "@app/features/Transaction/view/Edit/editTransactionViewModel";
import {
  TUpdateProfileViewModel,
  updateProfileUseCase,
} from "@app/features/Profile/domain/useCases/UpdateProfileUseCase";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useHomeViewModel = (
  transactionRepository: ITransactionRepository,
  profileRepository: IProfileRepository,
) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IBalanceResumeModel>();

  const getData = useCallback(
    async (monthId: number, year: number) => {
      try {
        setLoading(true);
        const balanceResumeData = await getBalanceResumeUseCase(
          { getBalanceResume: transactionRepository.getBalanceResume },
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

    [transactionRepository.getBalanceResume],
  );

  const deleteTransaction = useCallback(
    async (transactionId: string, options?: TDelteTransactionOptions) => {
      try {
        setLoading(true);
        await deleteTransactionUseCase(
          { deleteTransaction: transactionRepository.deleteTransaction },
          transactionId,
          options,
        );
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [transactionRepository.deleteTransaction],
  );

  const updateProfile = useCallback(
    async (profileData: TUpdateProfileViewModel) => {
      try {
        setLoading(true);
        await updateProfileUseCase(
          { updateProfile: profileRepository.updateProfile },
          profileData,
        );
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [profileRepository.updateProfile],
  );

  return { getData, isLoading, data, deleteTransaction, updateProfile };
};

export { useHomeViewModel };
