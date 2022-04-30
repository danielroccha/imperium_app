import { ITransactionService } from "@app/services/transaction";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";
import { useCallback } from "react";

export interface IBalanceResumeRepository {
  getBalanceResume(monthId: number): Promise<IBalanceResumeEntity>;
}

const useBalanceResumeRepository = (
  service: ITransactionService,
): IBalanceResumeRepository => {
  const getBalanceResume = useCallback(
    async (monthId: number) => {
      const response = await service.getBalanceService(monthId);
      return response;
    },
    [service],
  );

  return {
    getBalanceResume,
  };
};

export default useBalanceResumeRepository;
