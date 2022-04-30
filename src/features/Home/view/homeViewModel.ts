import { useCallback, useState } from "react";

import { handleError } from "@app/configs/api";
import { IBalanceResumeRepository } from "@app/features/Home/data/balanceResumeRepository";
import { getBalanceResumeUseCase } from "@app/features/Home/domain/useCases/getBalanceResumeUseCase";
import IBalanceResumeModel from "@app/features/Home/domain/models/IBalanceResumeModel";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useHomeViewModel = (repository: IBalanceResumeRepository) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IBalanceResumeModel>();

  const getData = useCallback(
    async (monthId: number) => {
      try {
        setLoading(true);
        const balanceResumeData = await getBalanceResumeUseCase(
          { getBalanceResume: repository.getBalanceResume },
          monthId,
        );
        setData(balanceResumeData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },

    [repository.getBalanceResume],
  );

  return { getData, isLoading, data };
};

export { useHomeViewModel };
