import React, { useEffect } from "react";
import { View } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import CategoryForm, {
  TCategoryFullForm,
} from "@app/features/Category/view/Form";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import { useEditCategoryViewModel } from "@app/features/Category/view/Edit/editCategoryViewModel";
import categoryService from "@app/services/category";

import NavBar from "@app/components/organisms/Navbar";
import { colors } from "@app/configs/Theme";
import Loading from "@app/components/molecules/Loading";

type EditCategoryParamList = {
  Detail: {
    categoryId: string;
  };
};

const EditCategory = () => {
  const theme = colors();
  const route = useRoute<RouteProp<EditCategoryParamList>>();
  const { categoryId } = route.params;
  const navigation = useNavigation();

  const categoryRespository = useCategoryRepository(categoryService);
  const { getCategory, isLoading, editCategory, category, isLoadingEdit } =
    useEditCategoryViewModel(categoryRespository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleValidateSuccess = (data: TCategoryFullForm) => {
    const { color, icon, name, type } = data;
    editCategory({ color, icon, name, type, id: categoryId });
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [getCategory, categoryId]);

  return (
    <>
      <NavBar
        title="Editar Categoria"
        iconRight="x"
        onClickActionRight={handleClose}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ backgroundColor: theme.mode }}>
          <CategoryForm
            disableSwitchTypeTransaction
            data={category}
            loading={isLoadingEdit}
            onValidateSuccess={handleValidateSuccess}
          />
        </View>
      )}
    </>
  );
};

export default EditCategory;
