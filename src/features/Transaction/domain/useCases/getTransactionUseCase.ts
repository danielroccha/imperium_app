import { ITransactionModel } from "@app/features/Home/domain/models/IBalanceResumeModel";
import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import ITransactionEntity from "@app/features/Transaction/data/ITransactionEntity";

const getTransactionUseCase = async (
  repository: Pick<ITransactionRepository, "getTransaction">,
  transactionId: string,
) => {
  const result = await repository.getTransaction(transactionId);
  return mapTransactionToDomain(result);
};

const mapTransactionToDomain = (
  transaction: ITransactionEntity,
): ITransactionModel => {
  return {
    category: transaction.category,
    categoryId: transaction.categoryId,
    date: transaction.date,
    id: transaction.id,
    name: transaction.name,
    type: transaction.type,
    userId: transaction.userId,
    value: transaction.value,
  };
};

export { getTransactionUseCase };
