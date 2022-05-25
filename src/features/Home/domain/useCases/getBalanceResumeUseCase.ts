import { IBalanceResumeRepository } from "@app/features/Home/data/balanceResumeRepository";
import IBalanceResumeEntity from "@app/features/Home/data/IBalanceResumeEntity";
import IBalanceResumeModel, {
  ITransactionModel,
  ITransactionSectionDateModel,
} from "@app/features/Home/domain/models/IBalanceResumeModel";

const getBalanceResumeUseCase = async (
  repository: Pick<IBalanceResumeRepository, "getBalanceResume">,
  monthId: number,
  year: number,
) => {
  const result = await repository.getBalanceResume(monthId, year);

  const dataDomain = mapBalanceResumeToDomain(result);

  return dataDomain;
};

const mapBalanceResumeToDomain = (data: IBalanceResumeEntity) => {
  const transactionsDomain = data.transactions.map(
    (item): ITransactionSectionDateModel => {
      const { section } = item;

      const dataTransactionsDomain = item.data.map(
        (transaction): ITransactionModel => {
          return {
            categoryId: transaction.categoryId,
            date: transaction.date,
            id: transaction.id,
            name: transaction.name,
            type: transaction.type,
            userId: transaction.userId,
            value: transaction.value,
            category: transaction.category,
          };
        },
      );

      return {
        data: dataTransactionsDomain,
        section,
      };
    },
  );

  const domainData: IBalanceResumeModel = {
    balanceResume: data.balanceResume,
    transactions: transactionsDomain,
  };
  return domainData;
};

export { getBalanceResumeUseCase };
