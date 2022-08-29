import React, { useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";
import I18n from "@app/languages/I18n";

import { useListCategoryViewModel } from "@app/features/Category/view/List/listCategoryViewModel";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import categoryService from "@app/services/category";

import NavBar from "@app/components/organisms/Navbar";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import Loading from "@app/components/molecules/Loading";

import { Body, Caption } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";
import RootStackNavigation from "@app/types/RootStackParams";
import EmptyStateList from "@app/components/organisms/EmptyStateList";
import { lotties } from "@app/assets";
import { TRANSACTION_TYPE } from "@app/constants";
import Card from "@app/components/atoms/Card";

const ListCategory = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const theme = colors();

  const categoryRespository = useCategoryRepository(categoryService);
  const {
    getCategories,
    isLoading,
    listCategoriesData,
    isRefreshing,
    deleteCategory,
  } = useListCategoryViewModel(categoryRespository);

  const handlePressRightAction = () => {
    navigation.navigate("CreateCategory");
  };

  const handlePressSugestionCategories = () => {
    navigation.navigate("CategorySugestion");
  };

  const handleEditCategory = (categoryId: string) => {
    navigation.navigate("EditCategory", { categoryId });
  };

  const getData = useCallback(
    (refresh?: boolean) => {
      getCategories(refresh);
    },
    [getCategories],
  );

  const handleDelelete = (categoryId: string) => {
    Alert.alert(
      I18n.t("alerts.remove_category_title"),
      I18n.t("alerts.remove_category_description"),
      [
        {
          text: I18n.t("buttons.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: I18n.t("buttons.remove"),
          style: "destructive",
          onPress: () => deleteCategory(categoryId),
        },
      ],
    );
  };

  const handleRenderItem = ({ item }: { item: ICategoryModel }) => {
    return (
      <TouchableOpacity
        onPress={() => handleEditCategory(item.id)}
        style={{
          marginVertical: dimens.tiny,
        }}>
        <Card style={{ padding: dimens.small }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CategoryIcon color={item.color} icon={item.icon} />
              <View style={{ marginLeft: dimens.small }}>
                <Body>{item.name}</Body>

                <Caption
                  color={
                    item.type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
                  }
                  align="left">
                  {item.type === TRANSACTION_TYPE.EXPENSE
                    ? I18n.t("common.expense")
                    : I18n.t("common.income")}
                </Caption>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDelelete(item.id)}
              hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
              <Icon name="trash" size={22} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    getCategories(true);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar
        backAction
        title={I18n.t("categories.categories")}
        iconRight="plus"
        onClickActionRight={handlePressRightAction}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1, backgroundColor: theme.mode }}>
          <FlatList
            contentContainerStyle={{ padding: dimens.small }}
            data={listCategoriesData}
            renderItem={handleRenderItem}
            ListEmptyComponent={
              <EmptyStateList
                lottie={lotties.emptyBox}
                text="Nenhuma categoria encontrada, pressione o + para criar uma nova categoria ou veja alguma de nossas sugestões."
              />
            }
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={theme.primary}
              />
            }
            ListHeaderComponent={
              <>
                <TouchableOpacity
                  onPress={handlePressSugestionCategories}
                  style={{
                    flexDirection: "row",
                    backgroundColor: theme.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: dimens.small,
                    marginBottom: dimens.small,
                    borderRadius: 10,
                  }}>
                  <Icon name="grid" size={22} color={theme.white} />
                  <Caption
                    color="white"
                    align="center"
                    style={{ marginLeft: dimens.tiny }}>
                    {I18n.t("categories.see_some_categories_suggesstions")}
                  </Caption>
                </TouchableOpacity>
              </>
            }
          />
        </View>
      )}
    </View>
  );
};

export default ListCategory;
