import { ITransactionRepository } from "@app/features/Transaction/data/transactionRepository";
import { TCreateTransactionViewModel } from "@app/features/Transaction/view/Create/createTransactionViewModel";

const createTransactionUseCase = async (
  repository: Pick<ITransactionRepository, "createTransaction">,
  data: TCreateTransactionViewModel,
) => {
  const {
    categoryId,
    date,
    isInstallment,
    name,
    type,
    value,
    repeat,
    repeatType,
  } = data;

  await repository.createTransaction({
    name,
    type,
    categoryId,
    date,
    isInstallment,
    value,
    repeat,
    repeatType,
  });
};

export { createTransactionUseCase };
