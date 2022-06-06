import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { TEditTransactionViewModel } from "@app/features/Transaction/view/Edit/editTransactionViewModel";

const editTransactionUseCase = async (
  repository: Pick<ITransactionRepository, "editTransaction">,
  data: TEditTransactionViewModel,
) => {
  const { id, categoryId, name, value } = data;

  await repository.editTransaction({
    categoryId,
    id,
    name,
    value,
  });
};

export { editTransactionUseCase };
