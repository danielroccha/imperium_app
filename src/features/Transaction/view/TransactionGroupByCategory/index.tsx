import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { PieChart } from "react-native-gifted-charts";
import I18n from "@app/languages/I18n";

import Loading from "@app/components/molecules/Loading";
import NavBar from "@app/components/organisms/Navbar";
import Card from "@app/components/atoms/Card";
import { Body, Caption } from "@app/components/atoms/Text";
import LottieViewComponent from "@app/components/molecules/LottieViewComponent";

import { useTransactionGroupByViewModel } from "@app/features/Transaction/view/TransactionGroupByCategory/transactionGroupByCategoryViewModel";
import useTransactionRepository from "@app/features/Transaction/data/transactionRepository";
import transactionService from "@app/services/transaction";
import ITransactionByCategoryModel from "@app/features/transaction/domain/models/ITransactionByCategoryModel";

import { colors, dimens } from "@app/configs/Theme";
import { TRANSACTION_TYPE } from "@app/constants";
import { lotties } from "@app/assets";
import Util from "@app/util";
import { RootState } from "@app/configs/store";
import { useSelector } from "react-redux";

type Chart = {
  id: string;
  text: string;
  color: string;
  value: number;
};

type TransactionsGroupByCategoryParamList = {
  Detail: {
    transactionType: TRANSACTION_TYPE;
    monthId: number;
    year: number;
  };
};

const TransactionsGroupByCategory = () => {
  const theme = colors();
  const { profile } = useSelector((state: RootState) => state.profile);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<TransactionsGroupByCategoryParamList>>();
  const { transactionType, monthId, year } = route.params;

  const [transactionsByCategory, setTransactionsByCategory] = useState<Chart[]>(
    [],
  );
  const [totalValue, setTotal] = useState(0);

  const transactionRespository = useTransactionRepository(transactionService);
  const { getData, data, isLoading } = useTransactionGroupByViewModel(
    transactionRespository,
  );

  const handleClose = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: ITransactionByCategoryModel }) => {
    return (
      <Card
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: dimens.small,
          marginBottom: dimens.small,
        }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 18,
              height: 18,
              backgroundColor: item.color,
              borderRadius: 9,
              marginRight: dimens.small,
            }}
          />
          <Body>{item.name}</Body>
        </View>
        <Body>{`${Util.formatToMoney(item.value, profile?.currency)}`}</Body>
      </Card>
    );
  };

  // const renderCenterText = () => (
  //   <View>
  //     <TextMoney size="regular" animation value={totalValue} />
  //   </View>
  // );

  useEffect(() => {
    if (data) {
      const total = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0,
      );
      setTotal(total);
      const transactionsByCategoryMap = data.map((item): Chart => {
        const percentage = (item.value * 100) / totalValue;
        return {
          id: item.id,
          text: `${percentage.toFixed()}%`,
          color: item.color,
          value: item.value,
        };
      });

      setTransactionsByCategory(transactionsByCategoryMap);
    }
  }, [data, totalValue]);

  useEffect(() => {
    getData(transactionType, monthId, year);
  }, [getData, transactionType, monthId, year]);

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar
        title={I18n.t("home.categories")}
        onClickActionRight={handleClose}
        iconRight="x"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={{ alignSelf: "center", marginTop: dimens.base }}>
            {transactionsByCategory.length ? (
              <PieChart
                data={transactionsByCategory}
                focusOnPress
                font="Montserrat-Regular"
                labelsPosition="outward"
                fontWeight="bold"
                textColor={theme.white}
                innerRadius={60}
                donut
                showText
                textBackgroundRadius={20}
                backgroundColor={theme.mode}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <LottieViewComponent animation={lotties.empty} size={180} />
                <Caption style={{ width: 200 }} align="center">
                  Nenhum lançamento até o momento para esse mês
                </Caption>
              </View>
            )}
          </View>

          <FlatList
            contentContainerStyle={{ padding: dimens.small }}
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

export default TransactionsGroupByCategory;
