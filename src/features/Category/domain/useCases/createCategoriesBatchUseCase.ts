import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";
import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { CreateCategorySugestionViewModel } from "@app/features/Category/view/CategorySugestion/categorySugestionViewModel";
import { TCreateCategorieBatchRemote } from "@app/services/category/remoteTypes/CreateCategoriesBatchRemote";

const createCategoriesBatchUseCase = async (
  repository: Pick<ICategoryRepository, "createCategoriesBatch">,
  dataSugestion: CreateCategorySugestionViewModel,
) => {
  const { data } = dataSugestion;

  const categories = data.map(
    (category): TCreateCategoryRemote => ({
      color: category.color,
      icon: category.icon,
      name: category.name,
      type: category.type,
    }),
  );

  const dataRemote: TCreateCategorieBatchRemote = { data: categories };

  await repository.createCategoriesBatch(dataRemote);
};

export { createCategoriesBatchUseCase };
