import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { TDelteTransactionOptions } from "../../view/Edit/editTransactionViewModel";

const deleteTransactionUseCase = async (
  repository: Pick<ITransactionRepository, "deleteTransaction">,
  transactionId: string,
  options?: TDelteTransactionOptions,
) => {
  await repository.deleteTransaction(transactionId, options);
};

export { deleteTransactionUseCase };
