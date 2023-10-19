import { ICategoryRepository } from "../../data/categoryRepository";
import { CreateCategoryViewModel } from "../../view/Create/createCategoryViewModel";

const createCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "createCategory">,
  data: CreateCategoryViewModel,
) => {
  await repository.createCategory({ ...data });
};

export { createCategoryUseCase };
