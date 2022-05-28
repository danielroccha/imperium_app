import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryRepository } from "../../data/categoryRepository";
import { ICategoryEntity } from "../../data/ICategoryEntity";
import { ICategoryModel } from "../models/ICategoryModel";

const listCategoriesUseCase = async (
  repository: Pick<ICategoryRepository, "listCategories">,
  type?: TRANSACTION_TYPE,
) => {
  const categories = await repository.listCategories(type);
  const categoriesDomain = mapCategoriesToDomain(categories);
  return categoriesDomain;
};

const mapCategoriesToDomain = (
  categories: ICategoryEntity[],
): ICategoryModel[] => categories.map((category): ICategoryModel => category);

export { listCategoriesUseCase };
