import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";
import I18n from "@app/languages/I18n";

import NavBar from "@app/components/organisms/Navbar";
import EmptyStateList from "@app/components/organisms/EmptyStateList";
import Loading from "@app/components/molecules/Loading";
import Pill from "@app/components/molecules/Pill";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import { Body, Small } from "@app/components/atoms/Text";

import RootStackNavigation from "@app/types/RootStackParams";
import IRecurrenceModel from "@app/features/Recurrence/domain/models/IRecurrenceModel";
import useRecurrenceRepository from "@app/features/Recurrence/data/recurrenceRepository";
import { useListRecurrenceViewModel } from "@app/features/Recurrence/view/List/listRecurrenceViewModel";
import recurrenceService from "@app/services/recurrence";

import { colors, dimens, getShadow } from "@app/configs/Theme";
import { TRANSACTION_TYPE } from "@app/constants";
import { lotties } from "@app/assets";
import Util from "@app/util";
import { RootState } from "@app/configs/store";
import { useSelector } from "react-redux";

type ListRecurrenceProps = {
  backAction?: boolean;
  onListChange?: (hasRecurrence: boolean) => void;
};

const ListRecurrence = ({
  backAction = true,
  onListChange,
}: ListRecurrenceProps) => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();
  const { profile } = useSelector((state: RootState) => state.profile);

  const recurrenceRepository = useRecurrenceRepository(recurrenceService);

  const {
    getRecurrences,
    deleteRecurrence,
    listRecurrencesData,
    isLoading,
    isRefreshing,
  } = useListRecurrenceViewModel(recurrenceRepository);

  const handlePressRightAction = () => {
    navigation.navigate("CreateRecurrence");
  };

  useFocusEffect(
    useCallback(() => {
      getRecurrences();
    }, [getRecurrences]),
  );

  const handleRefresh = () => {
    getRecurrences(true);
  };

  const renderItem = ({ item }: { item: IRecurrenceModel }) => {
    const date = new Date(item.date);

    const handleDelete = () => {
      Alert.alert(
        I18n.t("alerts.remove_recurrence_title"),
        I18n.t("alerts.remove_recurrence_description"),
        [
          {
            text: I18n.t("buttons.remove"),
            onPress: () => deleteRecurrence(item.id),
            style: "destructive",
          },
          {
            text: I18n.t("buttons.cancel"),
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
      );
    };

    const handleEditRecurrence = () => {
      navigation.navigate("EditRecurrence", { recurrenceId: item.id });
    };

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: dimens.small,
          ...getShadow(3),
          backgroundColor: theme.contrastMode,
          borderRadius: 10,
          marginBottom: dimens.small,
        }}
        onPress={handleEditRecurrence}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row" }}>
              <CategoryIcon
                color={item.category?.color ?? theme.primary}
                icon={item.category?.icon ?? ""}
              />
              <View style={{ marginLeft: dimens.small }}>
                <Body>{item.name}</Body>
                <Small>{`Lançado todo dia ${date.getDate()}`}</Small>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleDelete}
              hitSlop={{ bottom: 40, left: 40, right: 40, top: 40 }}>
              <Icon name="trash" size={22} color={theme.primary} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: dimens.base,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Pill
              text={
                item.type === TRANSACTION_TYPE.EXPENSE
                  ? I18n.t("common.expense")
                  : I18n.t("common.income")
              }
              color={
                item.type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
              }
            />
            <View style={{ marginLeft: dimens.small }}>
              <Body align="right">{I18n.t("common.value")}</Body>
              <Body
                color={
                  item.type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
                }>
                {Util.formatToMoney(item.value, profile?.currency)}
              </Body>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (onListChange) {
      const length = listRecurrencesData?.length ?? 0;
      onListChange(length > 0);
    }
  }, [onListChange, listRecurrencesData]);

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar
        backAction={backAction}
        title={I18n.t("home.recurrences")}
        iconRight="plus"
        onClickActionRight={handlePressRightAction}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: dimens.small }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
            />
          }
          ListEmptyComponent={
            <EmptyStateList
              lottie={lotties.emptyBox}
              text="Nenhuma recorrência encontrada, pressione o + para criar uma nova recorrência"
            />
          }
          renderItem={renderItem}
          data={listRecurrencesData}
          keyExtractor={item => item.id ?? item.name}
        />
      )}
    </View>
  );
};

export default ListRecurrence;
