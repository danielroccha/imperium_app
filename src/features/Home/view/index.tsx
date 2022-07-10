import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Alert, FlatList } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import MonthPicker, { EventTypes } from "react-native-month-year-picker";

import {
  ITransactionModel,
  ITransactionSectionDateModel,
} from "@app/features/Home/domain/models/IBalanceResumeModel";
import { useHomeViewModel } from "@app/features/Home/view/homeViewModel";
import { useProfileViewModel } from "@app/features/Profile/view/profileViewModel";

import useTransactionRepository from "@app/features/Transaction/data/transactionRepository";
import useProfileRepository from "@app/features/Profile/data/profileRepository";

import userService from "@app/services/user";
import transactionService from "@app/services/transaction";

import HeaderInfo from "@app/components/organisms/HeaderInfo";
import SectionHeader from "@app/components/molecules/SectionHeader";
import NavBar from "@app/components/organisms/Navbar";
import Loading from "@app/components/molecules/Loading";
import ItemExpanses from "@app/components/molecules/ItemExpanses";
import { Caption } from "@app/components/atoms/Text";

import { colors, SCREEN_HEIGHT } from "@app/configs/Theme";
import { images, lotties } from "@app/assets";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";
import EmptyStateList from "@app/components/organisms/EmptyStateList";

const Home = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const [stateDatePicker, setStateDatePicker] = useState(false);
  const [dateFilter, setDateFilter] = useState(new Date());

  const transactionRepository = useTransactionRepository(transactionService);
  const { data, getData, isLoading, deleteTransaction } = useHomeViewModel(
    transactionRepository,
  );

  const profileRepository = useProfileRepository(userService);

  const { getData: getDataProfile } = useProfileViewModel(profileRepository);

  const handleFilterDate = (date: Date) => {
    setDateFilter(new Date(date));
  };
  const handleResetDate = () => {
    setDateFilter(new Date());
  };

  const showDatePicker = () => {
    setStateDatePicker(true);
  };

  const hideDatePicker = () => {
    setStateDatePicker(false);
  };

  const getResumeData = useCallback(() => {
    getData(Util.getMonthIndex(dateFilter), dateFilter.getFullYear());
  }, [getData, dateFilter]);

  const renderItem = ({ item }: { item: ITransactionSectionDateModel }) => {
    const handlePress = (transaction: ITransactionModel) => {
      if (!transaction.isRecurrence) {
        navigation.navigate("EditTransaction", {
          transactionId: transaction.id,
        });
      } else {
        Alert.alert(
          "Ops!!!",
          "Essa transação é uma recorrência, para fazer a edição entre no menu recorrências.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        );
      }
    };

    const handleLongPress = (id: string) => {
      Alert.alert(
        "Apagar lançamento",
        "Tem certeza que deseja remover esse lançamento ?",
        [
          { text: "Cancelar", onPress: () => console.log("OK Pressed") },
          {
            text: "Remover",
            onPress: async () => {
              await deleteTransaction(id);
              getResumeData();
            },
            style: "destructive",
          },
        ],
      );
    };

    return (
      <>
        <SectionHeader date={item.section.date} value={item.section.value} />
        {item.data.map(transaction => (
          <ItemExpanses
            key={transaction.id}
            type={transaction.type}
            title={transaction.name}
            category={transaction.category.name}
            color={transaction.category.color}
            icon={transaction.category.icon}
            value={transaction.value}
            isRecurrence={transaction.isRecurrence}
            onPress={() => handlePress(transaction)}
            onLongPress={() => handleLongPress(transaction.id)}
          />
        ))}
      </>
    );
  };

  const handleDateChange = (event: EventTypes, newDate: Date) => {
    switch (event) {
      case "dateSetAction":
        handleFilterDate(newDate);
        break;
      case "dismissedAction":
        break;
    }
    hideDatePicker();
  };

  useFocusEffect(
    useCallback(() => {
      getResumeData();
    }, [getResumeData]),
  );

  useEffect(() => {
    getDataProfile();
  }, [getDataProfile]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.mode }}>
        <NavBar imageCentral={images.brandCrown} />

        <FlatList
          ListHeaderComponent={
            <HeaderInfo
              onResetDate={handleResetDate}
              onFilterDate={handleFilterDate}
              onTapDate={showDatePicker}
              dateFilter={dateFilter}
              currentBalance={data?.balanceResume.currentBalance ?? 0}
              expensesBalance={data?.balanceResume.monthlyExpenses ?? 0}
              incomesBalance={data?.balanceResume.monthlyIncomes ?? 0}
            />
          }
          data={data?.transactions ?? []}
          keyExtractor={(_, index) => index}
          renderItem={renderItem}
          ListEmptyComponent={
            <>
              {isLoading ? (
                <View style={{ height: 200 }}>
                  <Loading />
                </View>
              ) : (
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
              )}
            </>
          }
        />
      </View>
      {stateDatePicker && (
        <>
          <TouchableWithoutFeedback onPress={hideDatePicker}>
            <View
              style={{
                backgroundColor: theme.mode,
                height: SCREEN_HEIGHT,
              }}>
              <EmptyStateList
                lottie={lotties.calendar}
                text="Selecione um mês"
              />
            </View>
          </TouchableWithoutFeedback>
          <MonthPicker
            onChange={handleDateChange}
            value={dateFilter}
            minimumDate={new Date(2020, 5)}
            maximumDate={new Date(2050, Util.getMonthIndex(dateFilter))}
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
