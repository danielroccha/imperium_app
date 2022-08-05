import api from "@app/configs/api";
import { TRANSACTION_TYPE } from "@app/constants";
import API_SERVICES from "@app/constants/api";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";
import ITransactionEntity from "@app/features/Transaction/data/ITransactionEntity";
import ITransactionByCategoryEntity from "@app/features/Transaction/data/ITransactionsByCategoryEntity";
import { TCreateTransactionRemote } from "@app/services/transaction/remoteTypes/CreateTransactionRemote";
import { TEditTransactionRemote } from "@app/services/transaction/remoteTypes/EditTransactionRemote";
import { TDeleteHeaderTransaction } from "@app/services/transaction/remoteTypes/DeleteTransactionRemote";

export interface ITransactionService {
  getBalanceService: (
    monthId: number,
    year: number,
  ) => Promise<IBalanceResumeEntity>;
  createTransactionService: (data: TCreateTransactionRemote) => Promise<void>;
  getTransactionService: (transactionId: string) => Promise<ITransactionEntity>;
  deleteTransactionService: (
    transactionId: string,
    headers?: TDeleteHeaderTransaction,
  ) => Promise<void>;
  editTransactionService: (data: TEditTransactionRemote) => Promise<void>;
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

const deleteTransactionService = async (
  transactionId: string,
  headers?: TDeleteHeaderTransaction,
): Promise<void> => {
  console.log(headers);
  return api
    .delete(
      API_SERVICES.TRANSACTION_SERVICES.DELETE_TRANSACTION(transactionId),
      { headers },
    )
    .then(res => res.data);
};

const createTransactionService = (
  data: TCreateTransactionRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.TRANSACTION_SERVICES.CREATE_TRANSACTION, data)
    .then(res => res.data);

const getTransactionService = (
  transactionId: string,
): Promise<ITransactionEntity> =>
  api
    .get(API_SERVICES.TRANSACTION_SERVICES.GET_TRANSACTION(transactionId))
    .then(res => res.data);

const editTransactionService = (data: TEditTransactionRemote): Promise<void> =>
  api
    .put(API_SERVICES.TRANSACTION_SERVICES.EDIT_TRANSACTION(data.id), data)
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
  createTransactionService,
  getTransactionService,
  getTransactionsGroupByCategory,
  deleteTransactionService,
  editTransactionService,
};

export default transactionService;
