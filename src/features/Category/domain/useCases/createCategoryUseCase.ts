import { ICategoryRepository } from "../../data/categoryRepository";
import { CreateCategoryViewModel } from "../../view/Create/createCategoryViewModel";

const createCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "createCategory">,
  data: CreateCategoryViewModel,
) => {
  const { color, icon, name, type } = data;
  await repository.createCategory({ icon, color, name, type });
};

export { createCategoryUseCase };
