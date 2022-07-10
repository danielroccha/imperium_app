import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { createCategoryUseCase } from "@app/features/Category/domain/useCases/createCategoryUseCase";

import handleApplicationError from "@app/handles/apiError";
import { TRANSACTION_TYPE } from "@app/constants";

export type CreateCategoryViewModel = {
  name: string;
  type: TRANSACTION_TYPE;
  color: string;
  icon: string;
};

const useCreateCategoryViewModel = (repository: ICategoryRepository) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const createCategory = useCallback(
    async (data: CreateCategoryViewModel) => {
      try {
        setLoading(true);
        await createCategoryUseCase(
          { createCategory: repository.createCategory },
          data,
        );
        navigation.goBack();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },
    [repository.createCategory, navigation],
  );

  return { createCategory, isLoading };
};

export { useCreateCategoryViewModel };
