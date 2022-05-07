import { useCallback, useState } from "react";

import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { listCategoriesUseCase } from "@app/features/Category/domain/useCases/listCategoriesUseCase";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

import { handleError } from "@app/configs/api";

const useSelectCategoryViewModel = (repository: ICategoryRepository) => {
  const [isLoading, setLoading] = useState(false);
  const [listCategoriesData, setListCategoriesData] =
    useState<ICategoryModel[]>();

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const listCategories = await listCategoriesUseCase({
        listCategories: repository.listCategories,
      });
      setListCategoriesData(listCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  }, [repository.listCategories]);

  return {
    getCategories,
    isLoading,
    listCategoriesData,
  };
};

export { useSelectCategoryViewModel };
