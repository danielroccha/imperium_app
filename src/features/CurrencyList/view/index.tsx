import React from "react";
import { View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Card from "@app/components/atoms/Card";
import NavBar from "@app/components/organisms/Navbar";
import { Caption } from "@app/components/atoms/Text";
import RootStackNavigation from "@app/types/RootStackParams";

import Util from "@app/util";
import { Currency, currencyList } from "@app/constants";
import { colors, dimens } from "@app/configs/Theme";

const CurrencyList = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectCurrency = (item: Currency) => {};

  const handleRenderItem = ({ item }: { item: Currency }) => {
    return (
      <Card style={{ marginVertical: dimens.tiny }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: dimens.small,
          }}
          onPress={() => handleSelectCurrency(item)}>
          <Caption
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ width: 200 }}>
            {item.name}
          </Caption>
          <Caption color="primary">
            {Util.formatToMoney(100, item.code)}
          </Caption>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <NavBar backAction onClickActionLeft={handleBack} />
      <FlatList
        data={currencyList}
        renderItem={handleRenderItem}
        contentContainerStyle={{ padding: dimens.small, paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
};

export default CurrencyList;
