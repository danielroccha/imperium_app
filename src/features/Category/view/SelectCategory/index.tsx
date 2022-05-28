import { Caption } from "@app/components/atoms/Text";
import React, { useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import NavBar from "@app/components/organisms/Navbar";
import { colors, dimens, getShadow, SCREEN_HEIGHT } from "@app/configs/Theme";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import { ICategoryModel } from "../../domain/models/ICategoryModel";
import useCategoryRepository from "../../data/categoryRepository";
import categoryService from "@app/services/category";
import { useSelectCategoryViewModel } from "./selectCategoryViewModel";
import Loading from "@app/components/molecules/Loading";
import { TRANSACTION_TYPE } from "@app/constants";

type SelectCategoryParamList = {
  Detail: {
    onSelectCategory: (data: ICategoryModel) => void;
    type: TRANSACTION_TYPE;
  };
};

const SelectCategory = () => {
  const theme = colors();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<SelectCategoryParamList>>();
  const { onSelectCategory, type } = route.params;

  const categoryRepository = useCategoryRepository(categoryService);
  const { getCategories, isLoading, listCategoriesData } =
    useSelectCategoryViewModel(categoryRepository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSelectCategory = (data: ICategoryModel) => {
    onSelectCategory(data);
    handleClose();
  };

  useEffect(() => {
    getCategories(type);
  }, [getCategories, type]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.blackTransparent }}>
      <View
        style={{
          backgroundColor: theme.white,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT * 0.8,
        }}>
        <NavBar
          iconRight="x"
          title="Selecione uma categoria"
          onClickActionRight={handleClose}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            contentContainerStyle={{ padding: dimens.small }}
            data={listCategoriesData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: dimens.tiny,
                  backgroundColor: theme.white,
                  padding: dimens.small,
                  borderRadius: 10,
                  ...getShadow(3),
                }}
                onPress={() => handleSelectCategory(item)}>
                <>
                  <CategoryIcon color={item.color} icon={item.icon} />
                  <Caption style={{ marginLeft: dimens.base }}>
                    {item.name}
                  </Caption>
                </>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SelectCategory;
