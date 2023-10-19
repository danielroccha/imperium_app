import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { EditCategoryViewModel } from "../../view/Edit/editCategoryViewModel";

const editCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "editCategory">,
  data: EditCategoryViewModel,
) => {
  await repository.editCategory({ ...data });
};

export { editCategoryUseCase };
