import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Alert,
  FlatList,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";

import { requestTrackingPermission } from "react-native-tracking-transparency";
import I18n from "@app/languages/I18n";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LottieViewComponent from "@app/components/molecules/LottieViewComponent";
import semver from "semver";
import DeviceInfo from "react-native-device-info";
import Icon from "react-native-vector-icons/Feather";

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

import { colors, dimens, getShadow, SCREEN_WIDTH } from "@app/configs/Theme";
import { images, lotties } from "@app/assets";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";
import Divide from "@app/components/atoms/Divide";
import { TRANSACTION_TYPE } from "@app/constants";
import DatePicker from "react-native-date-picker";
import remoteConfigProvider from "@app/providers/remoteConfig";

const Home = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const [stateDatePicker, setStateDatePicker] = useState(false);
  const [showAvailableVersion, setShowAvailableVersion] = useState(false);
  const [dateFilter, setDateFilter] = useState(new Date());
  const [considerFutureTransaction, setConsiderFutureTransaction] =
    useState(true);

  const transactionRepository = useTransactionRepository(transactionService);
  const profileRepository = useProfileRepository(userService);

  const { data, getData, isLoading, deleteTransaction } = useHomeViewModel(
    transactionRepository,
    profileRepository,
  );

  const { getData: getDataProfile, profile } =
    useProfileViewModel(profileRepository);

  const handleFilterDate = (date: Date) => {
    hideDatePicker();
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
      if (transaction.isRecurrence && transaction.recurrence) {
        navigation.navigate("EditRecurrence", {
          recurrenceId: transaction.recurrence.id,
        });
      } else {
        const currentDate = new Date();
        const transactionDate = new Date(transaction.date);
        if (currentDate < transactionDate) {
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

  const handleConsiderFutureTransactions = () => {
    setConsiderFutureTransaction(!considerFutureTransaction);
  };

  const getMonthBalance = useCallback(() => {
    const date = new Date();
    const currentMonthId = Util.getMonthIndex(date);
    const monthIdFilter = Util.getMonthIndex(dateFilter);

    const currentYear = date.getFullYear();
    const yearFilter = dateFilter.getFullYear();

    if (
      monthIdFilter === currentMonthId &&
      yearFilter === currentYear &&
      data
    ) {
      if (considerFutureTransaction) {
        const transactions = data?.transactions.flatMap(i => i.data);

        const futureTransactions = transactions?.filter(
          transaction => new Date(transaction.date) > dateFilter,
        );

        const currentBalance = futureTransactions?.reduce(
          (previousValue, futureTransaction) => {
            if (futureTransaction.type === TRANSACTION_TYPE.INCOME) {
              return previousValue + futureTransaction.value;
            }
            return previousValue - futureTransaction.value;
          },
          data.balanceResume.currentBalance,
        );

        return currentBalance;
      }
      return data?.balanceResume.currentBalance ?? 0;
    }

    return data?.balanceResume.currentBalance ?? 0;
  }, [data, dateFilter, considerFutureTransaction]);

  const getRemoteConfigAvailableVersion = useCallback(async () => {
    const value = await remoteConfigProvider.getRemoteConfig("latest_version");

    if (semver.gt(value, DeviceInfo.getVersion())) {
      setShowAvailableVersion(true);
    }
  }, []);

  const getRemoteConfigDeprecatedVersion = useCallback(async () => {
    const value = await remoteConfigProvider.getRemoteConfig(
      "deprecated_version",
    );

    if (semver.lte(DeviceInfo.getVersion(), value)) {
      navigation.navigate("DeprecatedVersion");
    }
  }, [navigation]);

  const getRemoteConfigAppUrlStore = useCallback(async () => {
    const value = await remoteConfigProvider.getRemoteConfig("app_url_store");

    Linking.openURL(value);
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === "ios") {
      await requestTrackingPermission();
    }
  }, []);

  const handleCloseAvailableVersion = () => {
    setShowAvailableVersion(false);
  };

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    getRemoteConfigAvailableVersion();
  }, [getRemoteConfigAvailableVersion]);

  useEffect(() => {
    getRemoteConfigDeprecatedVersion();
  }, [getRemoteConfigDeprecatedVersion]);

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
              considerFutureTransactions={considerFutureTransaction}
              onConsiderFutureTransactions={handleConsiderFutureTransactions}
              currentBalance={getMonthBalance()}
              expensesBalance={data?.balanceResume.monthlyExpenses ?? 0}
              incomesBalance={data?.balanceResume.monthlyIncomes ?? 0}
            />
          }
          data={data?.transactions ?? []}
          contentContainerStyle={{ backgroundColor: colors().contrastMode }}
          keyExtractor={(item, index) => item.section.date + index}
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
      {showAvailableVersion && (
        <View
          style={{
            position: "absolute",
            bottom: dimens.small,
            ...getShadow(2),
            backgroundColor: theme.mode,
            width: SCREEN_WIDTH * 0.8,
            alignSelf: "center",
            padding: dimens.tiny,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <TouchableOpacity onPress={getRemoteConfigAppUrlStore}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <LottieViewComponent
                  animation={lotties.updateVersion}
                  size={40}
                />
                <Caption align="center">
                  {I18n.t("home.available_version")}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseAvailableVersion}>
              <Icon name="x" size={22} color={theme.contrast} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <DatePicker
        modal
        open={stateDatePicker}
        date={dateFilter}
        onConfirm={handleFilterDate}
        mode="date"
        title={I18n.t("fields.choose_a_date")}
        locale="PT-BR"
        onCancel={hideDatePicker}
        theme="light"
        textColor={theme.contrast}
        confirmText={I18n.t("buttons.confirm")}
        cancelText={I18n.t("buttons.cancel")}
      />
    </>
  );
};

export default Home;
