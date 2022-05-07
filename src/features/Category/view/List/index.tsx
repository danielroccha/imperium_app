import React, { useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";

import { useListCategoryViewModel } from "@app/features/Category/view/List/listCategoryViewModel";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import categoryService from "@app/services/category";

import NavBar from "@app/components/organisms/Navbar";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import Loading from "@app/components/molecules/Loading";

import { Body, Caption } from "@app/components/atoms/Text";
import { colors, dimens, getShadow } from "@app/configs/Theme";
import RootStackNavigation from "@app/types/RootStackParams";

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
      "Remover essa categoria?",
      "Tem certeza que deseja remover essa catergoria?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Sim", onPress: () => deleteCategory(categoryId) },
      ],
    );
  };

  const handleRenderItem = ({ item }: { item: ICategoryModel }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: dimens.small,
          ...getShadow(3),
          backgroundColor: theme.white,
          borderRadius: 10,
          marginBottom: dimens.small,
        }}
        onPress={() => handleEditCategory(item.id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CategoryIcon color={item.color} icon={item.icon} />
          <Body style={{ marginLeft: dimens.small }}>{item.name}</Body>
        </View>
        <TouchableOpacity
          onPress={() => handleDelelete(item.id)}
          hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
          <Icon name="trash" size={22} color={theme.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    getCategories(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });

    return unsubscribe;
  }, [getData, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar
        backAction
        title="Categorias"
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
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={theme.primary}
              />
            }
            ListHeaderComponent={
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
                <Caption color="white" style={{ marginLeft: dimens.tiny }}>
                  Veja algumas sugestões de categorias
                </Caption>
              </TouchableOpacity>
            }
          />
        </View>
      )}
    </View>
  );
};

export default ListCategory;
