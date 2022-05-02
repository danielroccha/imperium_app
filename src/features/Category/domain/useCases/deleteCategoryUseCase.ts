import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";

const deleteCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "deleteCategory">,
  categoryId: string,
) => {
  await repository.deleteCategory(categoryId);
};

export { deleteCategoryUseCase };
