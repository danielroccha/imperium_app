import React, { useCallback } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import NavBar from "@app/components/organisms/Navbar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import { colors, dimens, getShadow } from "@app/configs/Theme";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import { Body, Small } from "@app/components/atoms/Text";
import useRecurrenceRepository from "../../data/recurrenceRepository";
import recurrenceService from "@app/services/recurrence";
import { useListRecurrenceViewModel } from "./listRecurrenceViewModel";
import IRecurrenceModel from "../../domain/models/IRecurrenceModel";
import Loading from "@app/components/molecules/Loading";
import Pill from "@app/components/molecules/Pill";
import { TRANSACTION_TYPE } from "@app/constants";
import Util from "@app/util";
import EmptyStateList from "@app/components/organisms/EmptyStateList";
import { lotties } from "@app/assets";

const ListRecurrence = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

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
        "Remover essa recorrência?",
        "Tem certeza que deseja remover essa recorrência?",
        [
          {
            text: "Remover",
            onPress: () => deleteRecurrence(item.id),
            style: "destructive",
          },
          {
            text: "Cancelar",
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
          backgroundColor: theme.white,
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
                item.type === TRANSACTION_TYPE.EXPENSE ? "Despesa" : "Receita"
              }
              color={
                item.type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
              }
            />
            <View style={{ marginLeft: dimens.small }}>
              <Body align="right">Valor</Body>
              <Body
                color={
                  item.type === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
                }>
                {Util.formatToMoney(item.value)}
              </Body>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar
        backAction
        title="Recorrências"
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
