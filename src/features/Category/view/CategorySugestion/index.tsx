import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import I18n from "@app/languages/I18n";

import {
  expensesCategorySugestion,
  incomesCategorySugestion,
  TRANSACTION_TYPE,
  TCategorySugestion,
} from "@app/constants";
import { Caption } from "@app/components/atoms/Text";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import { colors, dimens } from "@app/configs/Theme";
import styles from "./styles";
import NavBar from "@app/components/organisms/Navbar";
import { useNavigation } from "@react-navigation/native";
import Switch from "@app/components/molecules/Switch";
import CustomButton from "@app/components/atoms/Button";
import useCategoryRepository from "@app/features/Category/data/categoryRepository";
import categoryService from "@app/services/category";
import { useCategorySugestionViewModel } from "@app/features/Category/view/CategorySugestion/categorySugestionViewModel";
import { CreateCategoryViewModel } from "@app/features/Category/view/Create/createCategoryViewModel";
import { CreateCategorySugestionViewModel } from "@app/features/Category/view/CategorySugestion/categorySugestionViewModel";

type CategorySugestionProps = {
  showNavBar?: boolean;
  onSave?: () => void;
};

const CategorySugestion = ({
  onSave,
  showNavBar = true,
}: CategorySugestionProps) => {
  const navigation = useNavigation();
  const [categoriesSugestion, setCategoriesSugestion] = useState(
    expensesCategorySugestion,
  );
  const [selectedSugestions, setSelectedSugestions] = useState<
    TCategorySugestion[]
  >([]);

  const categoryRepository = useCategoryRepository(categoryService);

  const { createCategories, isLoading } =
    useCategorySugestionViewModel(categoryRepository);

  const theme = colors();

  const handleChangeTransactionType = (value: string) => {
    setCategoriesSugestion(
      value === TRANSACTION_TYPE.EXPENSE
        ? expensesCategorySugestion
        : incomesCategorySugestion,
    );
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSelectCategory = (item: TCategorySugestion) => {
    if (!selectedSugestions.includes(item)) {
      selectedSugestions.push(item);
      setSelectedSugestions([...selectedSugestions]);
    } else {
      const index = selectedSugestions.indexOf(item);
      selectedSugestions.splice(index, 1);
      setSelectedSugestions([...selectedSugestions]);
    }
  };

  const getBackgrouncColor = (item: TCategorySugestion) => {
    return {
      backgroundColor: selectedSugestions.includes(item)
        ? item.color
        : theme.contrastMode,
    };
  };

  const handleSaveCategoriesSugestions = () => {
    const categories = selectedSugestions.map(
      (category): CreateCategoryViewModel => ({
        color: category.color,
        icon: category.icon,
        name: category.name,
        type: category.type,
      }),
    );
    const data: CreateCategorySugestionViewModel = { data: categories };

    createCategories(data, onSave);
  };

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      {showNavBar && (
        <NavBar
          title={I18n.t("categories.categories_suggestions")}
          iconRight="x"
          onClickActionRight={handleClose}
        />
      )}

      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginVertical: dimens.base }}>
          <Switch
            options={[
              {
                text: I18n.t("common.expense"),
                value: TRANSACTION_TYPE.EXPENSE,
                color: theme.danger,
              },
              {
                text: I18n.t("common.income"),
                value: TRANSACTION_TYPE.INCOME,
                color: theme.green,
              },
            ]}
            value={TRANSACTION_TYPE.EXPENSE}
            onChange={handleChangeTransactionType}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
          {categoriesSugestion.map(item => (
            <TouchableOpacity
              key={item.icon}
              style={{
                ...styles(theme).container,
                ...getBackgrouncColor(item),
              }}
              onPress={() => handleSelectCategory(item)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <CategoryIcon
                  color={item.color}
                  icon={item.icon}
                  key={item.name}
                />
                <Caption
                  style={{ marginLeft: dimens.xtiny }}
                  color={selectedSugestions.includes(item) ? "white" : "black"}>
                  {item.name}
                </Caption>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <CustomButton
        title={I18n.t("buttons.save")}
        disabled={!selectedSugestions.length}
        styleButton={{
          margin: dimens.small,
        }}
        loading={isLoading}
        onPress={handleSaveCategoriesSugestions}
      />
    </View>
  );
};

export default CategorySugestion;
