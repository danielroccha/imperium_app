import React from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import I18n from "@app/languages/I18n";

import CategoryForm, {
  TCategoryFullForm,
} from "@app/features/Category/view/Form";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import { useCreateCategoryViewModel } from "@app/features/Category/view/Create/createCategoryViewModel";
import categoryService from "@app/services/category";

import NavBar from "@app/components/organisms/Navbar";
import { colors } from "@app/configs/Theme";

const CreateCategory = () => {
  const navigation = useNavigation();
  const theme = colors();

  const categoryRespository = useCategoryRepository(categoryService);
  const { createCategory, isLoading } =
    useCreateCategoryViewModel(categoryRespository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleValidateSuccess = (data: TCategoryFullForm) => {
    const { color, icon, name, type } = data;
    createCategory({ color, icon, name, type });
  };

  return (
    <>
      <NavBar
        title={I18n.t("categories.create_category")}
        iconRight="x"
        onClickActionRight={handleClose}
      />
      <View style={{ backgroundColor: theme.mode }}>
        <CategoryForm
          loading={isLoading}
          onValidateSuccess={handleValidateSuccess}
        />
      </View>
    </>
  );
};

export default CreateCategory;
