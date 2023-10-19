import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import { ICategoryEntity } from "../../data/ICategoryEntity";

const getCategoryUseCase = async (
  repository: Pick<ICategoryRepository, "getCategory">,
  categoryId: string,
) => {
  const result = await repository.getCategory(categoryId);
  return mapCategoryToDomain(result);
};

const mapCategoryToDomain = (category: ICategoryEntity): ICategoryModel => ({
  color: category.color,
  icon: category.icon,
  id: category.id,
  name: category.name,
  type: category.type,
  value: category.value,
  userId: category.userId,
});

export { getCategoryUseCase };
