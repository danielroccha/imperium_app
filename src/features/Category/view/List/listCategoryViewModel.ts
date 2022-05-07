import { useCallback, useState } from "react";

import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { listCategoriesUseCase } from "@app/features/Category/domain/useCases/listCategoriesUseCase";
import { deleteCategoryUseCase } from "@app/features/Category/domain/useCases/deleteCategoryUseCase";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

import { handleError } from "@app/configs/api";

const useListCategoryViewModel = (repository: ICategoryRepository) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listCategoriesData, setListCategoriesData] =
    useState<ICategoryModel[]>();

  const getCategories = useCallback(
    async (refresh?: boolean) => {
      try {
        refresh ? setIsRefreshing(true) : setLoading(true);
        const listCategories = await listCategoriesUseCase({
          listCategories: repository.listCategories,
        });
        setListCategoriesData(listCategories);
        refresh ? setIsRefreshing(false) : setLoading(false);
      } catch (error) {
        refresh ? setIsRefreshing(false) : setLoading(false);
        handleError(error);
      }
    },
    [repository.listCategories],
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      try {
        await deleteCategoryUseCase(
          {
            deleteCategory: repository.deleteCategory,
          },
          categoryId,
        );
        getCategories();
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },
    [repository.deleteCategory, getCategories],
  );

  return {
    getCategories,
    deleteCategory,
    isLoading,
    listCategoriesData,
    isRefreshing,
  };
};

export { useListCategoryViewModel };
