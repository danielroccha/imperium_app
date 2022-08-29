import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { createCategoriesBatchUseCase } from "@app/features/Category/domain/useCases/createCategoriesBatchUseCase";

import handleApplicationError from "@app/handles/apiError";
import { CreateCategoryViewModel } from "@app/features/Category/view/Create/createCategoryViewModel";

export type CreateCategorySugestionViewModel = {
  data: CreateCategoryViewModel[];
};

const useCategorySugestionViewModel = (repository: ICategoryRepository) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const createCategories = useCallback(
    async (data: CreateCategorySugestionViewModel, callback?: () => void) => {
      try {
        setLoading(true);
        await createCategoriesBatchUseCase(
          { createCategoriesBatch: repository.createCategoriesBatch },
          data,
        );
        setLoading(false);
        if (callback) {
          callback();
        } else {
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },
    [repository.createCategoriesBatch, navigation],
  );

  return { createCategories, isLoading };
};

export { useCategorySugestionViewModel };
