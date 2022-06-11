import { useCallback } from "react";
import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";
import { ICategoryService } from "@app/services/category";
import { ICategoryEntity } from "./ICategoryEntity";
import { TEditCategoryRemote } from "@app/services/category/remoteTypes/EditCategoryRemote";
import { TRANSACTION_TYPE } from "@app/constants";
import { TCreateCategorieBatchRemote } from "@app/services/category/remoteTypes/CreateCategoriesBatchRemote";

export interface ICategoryRepository {
  listCategories(type?: TRANSACTION_TYPE): Promise<ICategoryEntity[]>;
  createCategory(data: TCreateCategoryRemote): Promise<void>;
  createCategoriesBatch(data: TCreateCategorieBatchRemote): Promise<void>;
  editCategory(data: TEditCategoryRemote): Promise<void>;
  getCategory(categoryId: string): Promise<ICategoryEntity>;
  deleteCategory(categoryId: string): Promise<void>;
}

const useCategoryRepository = (
  service: ICategoryService,
): ICategoryRepository => {
  const listCategories = useCallback(
    async (type?: TRANSACTION_TYPE) => {
      const response = await service.listCategoriesService(type);
      return response;
    },
    [service],
  );

  const createCategory = useCallback(
    async (data: TCreateCategoryRemote) => {
      const response = await service.createCategoryService(data);
      return response;
    },
    [service],
  );

  const createCategoriesBatch = useCallback(
    async (data: TCreateCategorieBatchRemote) => {
      const response = await service.createCategoriesBatchService(data);
      return response;
    },
    [service],
  );

  const editCategory = useCallback(
    async (data: TEditCategoryRemote) => {
      const response = await service.editCategoryService(data);
      return response;
    },
    [service],
  );

  const getCategory = useCallback(
    async (categoryId: string) => {
      const response = await service.getCategoryService(categoryId);
      return response;
    },
    [service],
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      const response = await service.deleteCategoryService(categoryId);
      return response;
    },
    [service],
  );

  return {
    listCategories,
    createCategory,
    createCategoriesBatch,
    editCategory,
    getCategory,
    deleteCategory,
  };
};

export default useCategoryRepository;
