import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";

const deleteTransactionUseCase = async (
  repository: Pick<ITransactionRepository, "deleteTransaction">,
  transactionId: string,
) => {
  await repository.deleteTransaction(transactionId);
};

export { deleteTransactionUseCase };
