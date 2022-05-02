import { useCallback } from "react";
import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";
import { ICategoryService } from "@app/services/category";
import { ICategoryEntity } from "./ICategoryEntity";

export interface ICategoryRepository {
  listCategories(): Promise<ICategoryEntity[]>;
  createCategory(data: TCreateCategoryRemote): Promise<void>;
  editCategory(): Promise<void>;
  getCategory(): Promise<void>;
  deleteCategory(categoryId: string): Promise<void>;
}

const useCategoryRepository = (
  service: ICategoryService,
): ICategoryRepository => {
  const listCategories = useCallback(async () => {
    const response = await service.listCategoriesService();
    return response;
  }, [service]);

  const createCategory = useCallback(
    async (data: TCreateCategoryRemote) => {
      const response = await service.createCategoryService(data);
      return response;
    },
    [service],
  );

  const editCategory = useCallback(async () => {
    const response = await service.listCategoriesService();
    return response;
  }, [service]);

  const getCategory = useCallback(async () => {
    const response = await service.listCategoriesService();
    return response;
  }, [service]);

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
    editCategory,
    getCategory,
    deleteCategory,
  };
};

export default useCategoryRepository;
