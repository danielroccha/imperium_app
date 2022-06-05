import api from "@app/configs/api";
import { TRANSACTION_TYPE } from "@app/constants";
import API_SERVICES from "@app/constants/api";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";
import ITransactionEntity from "@app/features/Transaction/data/ITransactionEntity";
import ITransactionByCategoryEntity from "@app/features/Transaction/data/ITransactionsByCategoryEntity";
import { TCreateTransactionRemote } from "@app/services/transaction/remoteTypes/CreateTransactionRemote";

export interface ITransactionService {
  getBalanceService: (
    monthId: number,
    year: number,
  ) => Promise<IBalanceResumeEntity>;
  createTransaction: (data: TCreateTransactionRemote) => Promise<void>;
  getTransaction: (transactionId: string) => Promise<ITransactionEntity>;
  getTransactionsGroupByCategory: (
    monthId: number,
    year: number,
    transactionType: TRANSACTION_TYPE,
  ) => Promise<ITransactionByCategoryEntity[]>;
}

const getBalanceService = async (
  monthId: number,
  year: number,
): Promise<IBalanceResumeEntity> =>
  api
    .get(API_SERVICES.TRANSACTION_SERVICES.BALANCE_RESUME(monthId, year))
    .then(res => res.data);

const createTransaction = (data: TCreateTransactionRemote): Promise<void> =>
  api
    .post(API_SERVICES.TRANSACTION_SERVICES.CREATE_TRANSACTION, data)
    .then(res => res.data);

const getTransaction = (transactionId: string): Promise<ITransactionEntity> =>
  api
    .get(API_SERVICES.TRANSACTION_SERVICES.GET_TRANSACTION(transactionId))
    .then(res => res.data);

const getTransactionsGroupByCategory = (
  monthId: number,
  year: number,
  transactionType: TRANSACTION_TYPE,
): Promise<ITransactionByCategoryEntity[]> =>
  api
    .get(
      API_SERVICES.TRANSACTION_SERVICES.GET_TRANSACTION_GROUP_BY_CATEGORY(
        monthId,
        year,
        transactionType,
      ),
    )
    .then(res => res.data);

const transactionService: ITransactionService = {
  getBalanceService,
  createTransaction,
  getTransaction,
  getTransactionsGroupByCategory,
};

export default transactionService;
