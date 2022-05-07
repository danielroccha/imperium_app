import React from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import TransactionForm from "@app/features/Transaction/view/Form";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import { useCreateCategoryViewModel } from "@app/features/Category/view/Create/createCategoryViewModel";
import categoryService from "@app/services/category";

import NavBar from "@app/components/organisms/Navbar";
import { colors } from "@app/configs/Theme";

const CreateTransaction = () => {
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
      <View
        style={{
          backgroundColor: theme.mode,
          flex: 1,
        }}>
        <NavBar iconRight="x" onClickActionRight={handleClose} />
        <TransactionForm />
      </View>
    </>
  );
};

export default CreateTransaction;
