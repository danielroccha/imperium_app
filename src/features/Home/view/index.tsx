import React, { useEffect, useState } from "react";
import {
  SectionList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import LottieView from "lottie-react-native";
import MonthPicker, { EventTypes } from "react-native-month-year-picker";

import { colors, SCREEN_HEIGHT } from "@app/configs/Theme";
import { images, lotties } from "@app/assets";
import HeaderInfo from "@app/components/organisms/HeaderInfo";
import SectionHeader from "@app/components/molecules/SectionHeader";
import NavBar from "@app/components/organisms/Navbar";
import ItemExpanses from "@app/components/molecules/ItemExpanses";
import { useHomeViewModel } from "./homeViewModel";
import useBalanceResumeRepository from "../data/balanceResumeRepository";
import transactionService from "@app/services/transaction";
import Util from "@app/util";
import { Caption } from "@app/components/atoms/Text";

const Home = () => {
  const theme = colors();
  const [stateDatePicker, setStateDatePicker] = useState(false);
  const [dateFilter, setDateFilter] = useState<Date>();

  const balanceResumeRepository =
    useBalanceResumeRepository(transactionService);
  const { data, getData, isLoading } = useHomeViewModel(
    balanceResumeRepository,
  );

  const handleFilterDate = (monthIndex: number) => {
    getData(monthIndex);
  };

  const showDatePicker = () => {
    setStateDatePicker(true);
  };

  const hideDatePicker = () => {
    setStateDatePicker(false);
  };

  const handleDateChange = (event: EventTypes, newDate: Date) => {
    switch (event) {
      case "dateSetAction":
        setDateFilter(newDate);
        break;
      case "dismissedAction":
        break;
    }
    hideDatePicker();
  };

  useEffect(() => {
    getData(Util.getMonthIndex(new Date()));
  }, [getData]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.mode }}>
        <NavBar
          imageCentral={images.brandCrown}
          onClickActionLeft={() => null}
        />
        <HeaderInfo
          onFilterDate={handleFilterDate}
          onTapDate={showDatePicker}
          dateFilter={dateFilter}
          currentBalance={data?.balanceResume.currentBalance ?? 0}
          expensesBalance={data?.balanceResume.monthlyExpenses ?? 0}
          incomesBalance={data?.balanceResume.monthlyIncomes ?? 0}
        />
        <SectionList
          sections={data?.transactions ?? []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ItemExpanses
              type={item.type}
              title={item.name}
              category={item.category.name}
              color={item.category.color}
              icon={item.category.icon}
              value={item.value}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}>
              <LottieView
                source={lotties.empty}
                style={{ height: 200 }}
                autoPlay
              />
              <Caption style={{ width: 200 }} align="center">
                Nenhum lançamento até o momento para esse mês
              </Caption>
            </View>
          }
          renderSectionHeader={({ section: dataSection }) => (
            <SectionHeader
              date={dataSection.section.date}
              value={dataSection.section.value}
            />
          )}
        />
      </View>
      {stateDatePicker && (
        <>
          <TouchableWithoutFeedback onPress={hideDatePicker}>
            <View
              style={{
                backgroundColor: theme.blackTransparent,
                height: SCREEN_HEIGHT - 85,
              }}
            />
          </TouchableWithoutFeedback>
          <MonthPicker
            onChange={handleDateChange}
            value={dateFilter ?? new Date()}
            minimumDate={new Date(2020, 5)}
            maximumDate={new Date(2050, 5)}
            locale="PT-BR"
            autoTheme={false}
            okButton="Confirmar"
            cancelButton="Cancelar"
            mode="full"
          />
        </>
      )}
    </>
  );
};

{
  /*  */
}
export default Home;
