import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { EditCategoryViewModel } from "../../view/Edit/editCategoryViewModel";

const editCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "editCategory">,
  data: EditCategoryViewModel,
) => {
  const { color, icon, name, type, id } = data;
  await repository.editCategory({ color, icon, id, name, type });
};

export { editCategoryUseCase };
