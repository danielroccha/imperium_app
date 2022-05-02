import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  expensesCategorySugestion,
  incomesCategorySugestion,
  TRANSACTION_TYPE,
} from "@app/constants";
import { Caption } from "@app/components/atoms/Text";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import { colors, dimens } from "@app/configs/Theme";
import styles from "./styles";
import NavBar from "@app/components/organisms/Navbar";
import { useNavigation } from "@react-navigation/native";

const CategorySugestion = () => {
  const navigation = useNavigation();
  const [categoriesSugestion, setCategoriesSugestion] = useState(
    incomesCategorySugestion,
  );

  const theme = colors();

  const handleChangeTransactionType = (value: TRANSACTION_TYPE) => {
    setCategoriesSugestion(
      value === TRANSACTION_TYPE.EXPENSE
        ? expensesCategorySugestion
        : incomesCategorySugestion,
    );
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar
        title="Sugestões de categorias"
        iconRight="x"
        onClickActionRight={handleClose}
      />

      <ScrollView>
        <View style={{ marginBottom: dimens.small }}>
          <SwitchTransactionType
            text="Filtrar Categorias:"
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
            <View key={item.icon} style={styles(theme).container}>
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
                <Caption style={{ marginLeft: dimens.tiny }}>
                  {item.name}
                </Caption>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategorySugestion;
