import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
  Platform,
} from "react-native";

import I18n from "@app/languages/I18n";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LottieViewComponent from "@app/components/molecules/LottieViewComponent";
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

import { colors, dimens, getShadow, SCREEN_HEIGHT } from "@app/configs/Theme";
import { images, lotties } from "@app/assets";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";
import EmptyStateList from "@app/components/organisms/EmptyStateList";
import Divide from "@app/components/atoms/Divide";

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

  const { getData: getDataProfile, profile } =
    useProfileViewModel(profileRepository);

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

  const getResumeData = useCallback(async () => {
    await getData(Util.getMonthIndex(dateFilter), dateFilter.getFullYear());
  }, [getData, dateFilter]);

  const showDeleteTransactionAlert = useCallback(
    (id: string) => {
      Alert.alert(
        I18n.t("alerts.remove_transaction_title"),
        I18n.t("alerts.remove_transaction_description"),
        [
          {
            text: I18n.t("buttons.remove"),
            onPress: async () => {
              await deleteTransaction(id);
              await getResumeData();
            },
            style: "destructive",
          },
          {
            text: I18n.t("buttons.cancel"),
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
      );
    },
    [deleteTransaction, getResumeData],
  );

  const showDeleteTransactionInstallmentAlert = useCallback(
    (transaction: ITransactionModel) => {
      Alert.alert(
        I18n.t("alerts.remove_transaction_title"),
        I18n.t("alerts.remove_transaction_description"),
        [
          {
            text: I18n.t("alerts.remove_transaction_installments"),
            onPress: async () => {
              if (transaction && transaction.id) {
                await deleteTransaction(transaction.id, {
                  transactionDate: transaction.date.toLocaleString(),
                  deleteAll: true,
                });
                await getResumeData();
              }
            },
            style: "destructive",
          },
          {
            text: I18n.t("alerts.remove_transaction_installments_only"),
            onPress: async () => {
              if (transaction && transaction.id) {
                await deleteTransaction(transaction.id);
                await getResumeData();
              }
            },
          },
          {
            text: I18n.t("buttons.cancel"),
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
      );
    },
    [deleteTransaction, getResumeData],
  );

  const handleLongPress = useCallback(
    (transaction: ITransactionModel) => {
      if (transaction.isInstallment) {
        showDeleteTransactionInstallmentAlert(transaction);
      } else {
        showDeleteTransactionAlert(transaction.id);
      }
    },
    [showDeleteTransactionInstallmentAlert, showDeleteTransactionAlert],
  );

  const handlePress = useCallback(
    (transaction: ITransactionModel) => {
      console.log(transaction);
      if (transaction.isRecurrence && transaction.recurrence) {
        navigation.navigate("EditRecurrence", {
          recurrenceId: transaction.recurrence.id,
        });
      } else {
        const currentDate = new Date();
        const transactionDate = new Date(transaction.date);
        const currentMonth = Util.getMonthIndex(currentDate);
        const transactionMonth = Util.getMonthIndex(transactionDate);
        const currentYear = currentDate;
        const transactionYear = transactionDate;
        if (currentMonth < transactionMonth && currentYear < transactionYear) {
          Alert.alert(
            I18n.t("common.attention"),
            I18n.t("alerts.recurrence_alert_description"),
          );
        } else {
          navigation.navigate("EditTransaction", {
            transactionId: transaction.id,
          });
        }
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ITransactionSectionDateModel }) => (
      <>
        <SectionHeader date={item.section.date} value={item.section.value} />
        <View
          style={{
            ...getShadow(1),
            margin: dimens.tiny,
            borderRadius: 10,
            backgroundColor: colors().mode,
          }}>
          {item.data.map((transaction, index, array) => (
            <>
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
                onLongPress={() => handleLongPress(transaction)}
              />
              {array.length - 1 !== index && (
                <Divide color="contrastMode" stylesDivide={{ height: 1.5 }} />
              )}
            </>
          ))}
        </View>
      </>
    ),
    [handleLongPress, handlePress],
  );

  const handleDateChange = (event: EventTypes, newDate: Date) => {
    hideDatePicker();
    switch (event) {
      case "dateSetAction":
        handleFilterDate(newDate);
        break;
      case "dismissedAction":
        break;
    }
  };

  const getMonthBalance = useCallback(() => {
    if (data) {
      return (
        data.balanceResume.monthlyIncomes - data.balanceResume.monthlyExpenses
      );
    }
    return 0;
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      getResumeData();
    }, [getResumeData]),
  );

  useFocusEffect(
    useCallback(() => {
      getDataProfile();
    }, [getDataProfile]),
  );

  useEffect(() => {
    if (profile?.isFirstLogin) {
      navigation.navigate("OnboardingStack");
    }
  }, [profile, navigation]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.contrastMode }}>
        <NavBar imageCentral={images.brandCrown} showAvatarProfile />

        <FlatList
          ListHeaderComponent={
            <HeaderInfo
              onResetDate={handleResetDate}
              onFilterDate={handleFilterDate}
              onTapDate={showDatePicker}
              dateFilter={dateFilter}
              currentBalance={getMonthBalance()}
              expensesBalance={data?.balanceResume.monthlyExpenses ?? 0}
              incomesBalance={data?.balanceResume.monthlyIncomes ?? 0}
            />
          }
          data={data?.transactions ?? []}
          contentContainerStyle={{ backgroundColor: colors().contrastMode }}
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
                    marginTop: dimens.large,
                  }}>
                  <LottieViewComponent animation={lotties.empty} size={200} />
                  <Caption
                    style={{ width: 200, marginTop: dimens.medium }}
                    align="center">
                    {I18n.t("placeholders.no_transactions_until_now")}
                  </Caption>
                </View>
              )}
            </>
          }
        />
      </View>
      {stateDatePicker && (
        <>
          {Platform.OS === "ios" && (
            <TouchableWithoutFeedback onPress={hideDatePicker}>
              <View
                style={{
                  backgroundColor: theme.mode,
                  height: SCREEN_HEIGHT,
                }}>
                <EmptyStateList
                  lottie={lotties.calendar}
                  text={I18n.t("home.month_select")}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <MonthPicker
            onChange={handleDateChange}
            value={dateFilter}
            minimumDate={new Date(2020, 5)}
            maximumDate={new Date(2050, Util.getMonthIndex(dateFilter))}
            locale="PT-BR"
            autoTheme={false}
            okButton={I18n.t("buttons.confirm")}
            cancelButton={I18n.t("buttons.cancel")}
            mode="number"
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
