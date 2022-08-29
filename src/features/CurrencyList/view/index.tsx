import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import I18n from "@app/languages/I18n";
import Icon from "react-native-vector-icons/Feather";

import Card from "@app/components/atoms/Card";
import NavBar from "@app/components/organisms/Navbar";
import { Caption, Regular } from "@app/components/atoms/Text";
import RootStackNavigation from "@app/types/RootStackParams";

import Util from "@app/util";
import { Currency, currencyList } from "@app/constants";
import { colors, dimens, fontSize } from "@app/configs/Theme";
import CustomButton from "@app/components/atoms/Button";
import { useUpdateCurrencyViewModel } from "./currencyListViewModel";
import useProfileRepository from "@app/features/Profile/data/profileRepository";
import userService from "@app/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@app/configs/store";

type CurrencyListProps = {
  showNavBar?: boolean;
  onSelectItem?: () => void;
};

const CurrencyList = ({
  onSelectItem,
  showNavBar = true,
}: CurrencyListProps) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [searchText, setSearchText] = useState("");
  const [currencyListData, setCurrencyListData] = useState(currencyList);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>();
  const navigation = useNavigation<RootStackNavigation>();

  const profileRepository = useProfileRepository(userService);
  const { isLoading, updateCurrency } =
    useUpdateCurrencyViewModel(profileRepository);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    const value = text.toLowerCase();
    setSearchText(value);

    const result = currencyList.filter(i =>
      i.name.toLowerCase().includes(value),
    );

    setCurrencyListData(result);
  };
  const clearFieldText = () => {
    setSearchText("");
    setCurrencyListData(currencyList);
  };

  const handleSelectCurrency = (item: Currency) => {
    setSelectedCurrency(item);
  };

  const handleSelectItem = () => {
    updateCurrency({ currency: selectedCurrency?.code }, onSelectItem);
  };

  useEffect(() => {
    if (profile?.currency) {
      const currency = currencyListData.find(i => i.code === profile.currency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, [profile, currencyListData]);

  const handleRenderItem = ({ item }: { item: Currency }) => {
    return (
      <Card
        style={{
          marginVertical: dimens.tiny,
          backgroundColor:
            selectedCurrency?.code === item.code ? theme.secondary : theme.mode,
        }}>
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
            style={{ width: 200 }}
            color={selectedCurrency?.code === item.code ? "white" : "black"}>
            {item.name}
          </Caption>
          <Caption
            color={selectedCurrency?.code === item.code ? "white" : "primary"}>
            {Util.formatToMoney(100, item.code)}
          </Caption>
        </TouchableOpacity>
      </Card>
    );
  };

  const theme = colors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.mode }}>
      {showNavBar && <NavBar backAction onClickActionLeft={handleBack} />}
      <View style={{ padding: dimens.base }}>
        <Regular align="center">
          {I18n.t("currency.select_or_search_currency")}
        </Regular>
      </View>
      <View
        style={{
          paddingHorizontal: dimens.small,
          flexDirection: "row",
          justifyContent: "center",
        }}>
        <TextInput
          placeholder={I18n.t("placeholders.search_currency")}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderBottomWidth: 1.5,
            borderBottomColor: theme.contrastMode,
            padding: dimens.xtiny,
            fontSize: fontSize.body,
            fontFamily: "Montserrat-Regular",
            width: "90%",
          }}
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={theme.grey}
          underlineColorAndroid="transparent"
        />
        {!!searchText && (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            hitSlop={{ bottom: 50, left: 50, right: 50, top: 50 }}
            onPress={clearFieldText}>
            <Icon name="x" size={15} color={theme.contrast} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={currencyListData}
        renderItem={handleRenderItem}
        keyboardDismissMode="interactive"
        contentContainerStyle={{ paddingBottom: 50, padding: dimens.small }}
      />
      <CustomButton
        title={I18n.t("buttons.save")}
        disabled={!selectedCurrency}
        onPress={handleSelectItem}
        loading={isLoading}
        styleButton={{ margin: dimens.small }}
      />
    </SafeAreaView>
  );
};

export default CurrencyList;
