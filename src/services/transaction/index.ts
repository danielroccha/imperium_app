import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";

export interface ITransactionService {
  getBalanceService: (monthId: number) => Promise<IBalanceResumeEntity>;
}

const getBalanceService = async (
  monthId: number,
): Promise<IBalanceResumeEntity> =>
  api
    .get(API_SERVICES.TRANSACTION_SERVICES.BALANCE_RESUME(monthId))
    .then(res => res.data);

const transactionService: ITransactionService = {
  getBalanceService,
};

export default transactionService;
