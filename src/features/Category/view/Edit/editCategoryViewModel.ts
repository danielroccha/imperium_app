import { useCallback, useState } from "react";

import { ICategoryRepository } from "@app/features/Category/data/categoryRepository";
import { editCategoryUseCase } from "@app/features/Category/domain/useCases/editCategoryUseCase";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";

import handleApplicationError from "@app/handles/apiError";
import { getCategoryUseCase } from "@app/features/Category/domain/useCases/getCategoryUseCase";
import { TRANSACTION_TYPE } from "@app/constants";
import { useNavigation } from "@react-navigation/native";

export type EditCategoryViewModel = {
  id: string;
  name: string;
  type: TRANSACTION_TYPE;
  color: string;
  icon: string;
};

const useEditCategoryViewModel = (repository: ICategoryRepository) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingEdit, setLoadingEdit] = useState(false);
  const [category, setCategory] = useState<ICategoryModel>();

  const editCategory = useCallback(
    async (data: EditCategoryViewModel) => {
      try {
        setLoadingEdit(true);
        await editCategoryUseCase(
          {
            editCategory: repository.editCategory,
          },
          data,
        );
        navigation.goBack();
        setLoadingEdit(false);
      } catch (error) {
        setLoadingEdit(false);
        handleApplicationError.handleError(error);
      }
    },
    [repository.editCategory, navigation],
  );

  const getCategory = useCallback(
    async (categoryId: string) => {
      try {
        setLoading(true);
        const categoryData = await getCategoryUseCase(
          {
            getCategory: repository.getCategory,
          },
          categoryId,
        );
        setLoading(false);
        setCategory(categoryData);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },
    [repository.getCategory],
  );

  return { getCategory, editCategory, isLoading, category, isLoadingEdit };
};

export { useEditCategoryViewModel };
