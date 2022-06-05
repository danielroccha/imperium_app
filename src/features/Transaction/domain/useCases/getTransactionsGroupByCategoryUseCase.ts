import ITransactionByCategoryModel from "@app/features/Transaction/domain/models/ITransactionByCategoryModel";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import ITransactionByCategoryEntity from "@app/features/Transaction/data/ITransactionsByCategoryEntity";
import { TRANSACTION_TYPE } from "@app/constants";

const getTransactionByCategoryUseCase = async (
  repository: Pick<ITransactionRepository, "getTransactionsGroupByCategory">,
  monthId: number,
  year: number,
  transactionType: TRANSACTION_TYPE,
) => {
  const result = await repository.getTransactionsGroupByCategory(
    monthId,
    year,
    transactionType,
  );
  return mapTransactionByCategoryToDomain(result);
};

const mapTransactionByCategoryToDomain = (
  transactions: ITransactionByCategoryEntity[],
): ITransactionByCategoryModel[] =>
  transactions.map((transaction): ITransactionByCategoryModel => transaction);

export { getTransactionByCategoryUseCase };
