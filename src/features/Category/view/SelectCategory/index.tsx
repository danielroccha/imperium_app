import { Caption } from "@app/components/atoms/Text";
import React, { useCallback } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import I18n from "@app/languages/I18n";

import NavBar from "@app/components/organisms/Navbar";
import { colors, dimens, getShadow, SCREEN_HEIGHT } from "@app/configs/Theme";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import { ICategoryModel } from "../../domain/models/ICategoryModel";
import useCategoryRepository from "../../data/categoryRepository";
import categoryService from "@app/services/category";
import { useSelectCategoryViewModel } from "./selectCategoryViewModel";
import Loading from "@app/components/molecules/Loading";
import { TRANSACTION_TYPE } from "@app/constants";
import CustomButton from "@app/components/atoms/Button";
import RootStackNavigation from "@app/types/RootStackParams";
import EmptyStateList from "@app/components/organisms/EmptyStateList";
import { lotties } from "@app/assets";

type SelectCategoryParamList = {
  Detail: {
    onSelectCategory: (data: ICategoryModel) => void;
    type: TRANSACTION_TYPE;
  };
};

const SelectCategory = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();
  const route = useRoute<RouteProp<SelectCategoryParamList>>();
  const { onSelectCategory, type } = route.params;

  const categoryRepository = useCategoryRepository(categoryService);
  const { getCategories, isLoading, listCategoriesData } =
    useSelectCategoryViewModel(categoryRepository);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleOpenCreateCategory = () => {
    navigation.navigate("CreateCategory");
  };

  const handleSelectCategory = (data: ICategoryModel) => {
    onSelectCategory(data);
    handleClose();
  };

  useFocusEffect(
    useCallback(() => {
      getCategories(type);
    }, [getCategories, type]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.blackTransparent }}>
      <View
        style={{
          backgroundColor: theme.mode,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT * 0.8,
        }}>
        <NavBar
          iconRight="x"
          title={I18n.t("fields.choose_a_category")}
          onClickActionRight={handleClose}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <View style={{ flex: 1 }}>
            {listCategoriesData?.length === 0 ? (
              <View style={{ flex: 1 }}>
                <EmptyStateList
                  text="Nenhuma categoria cadastrada ainda."
                  lottie={lotties.empty}
                />
              </View>
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
                      backgroundColor: theme.contrastMode,
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

            <CustomButton
              title={I18n.t("buttons.create_new_category")}
              onPress={handleOpenCreateCategory}
              styleButton={{ margin: dimens.small }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectCategory;
