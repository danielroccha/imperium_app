import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/Feather";

import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import CustomButton from "@app/components/atoms/Button";
import { colors, dimens, getShadow, SCREEN_HEIGHT } from "@app/configs/Theme";
import Input from "@app/components/atoms/Input";
import { useForm } from "react-hook-form";
import {
  BigTitle,
  Body,
  Caption,
  HeadLine,
  Regular,
  Subtitle,
} from "@app/components/atoms/Text";
import { TRANSACTION_OPTIONS, TRANSACTION_TYPE } from "@app/constants";
import SelectDate from "@app/components/organisms/SelectDate";
import Switch from "@app/components/molecules/Switch";
import SelectPeriod from "@app/components/organisms/SelectPeriod";
import Util from "@app/util";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import Divide from "@app/components/atoms/Divide";

const TransactionForm = () => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.EXPENSE,
  );

  const [transactionOption, setTransactionOption] = useState("");

  const [category, setCategory] = useState<ICategoryModel | null>();

  const [date, setDate] = useState<Date>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        value: yup.string(),
        description: yup.string(),
      }),
    ),
  });

  const onSubmit = () => {};

  const handleChangeTransactionType = (value: TRANSACTION_TYPE) => {
    setTransactionType(value);
  };

  const handleChangeTransactionOption = (value: string) => {
    setTransactionOption(value);
  };

  const handleSetDate = (value: Date) => {
    setDate(value);
  };

  const handlePressSelectCateogry = () => {
    if (category) {
      setCategory(null);
    } else {
      navigation.navigate("SelectCategory", {
        onSelectCategory: handleSelectCategory,
      });
    }
  };

  const handleSelectCategory = (data: ICategoryModel) => {
    setCategory(data);
  };

  return (
    <ScrollView style={{ backgroundColor: theme.mode }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor:
            transactionType == TRANSACTION_TYPE.INCOME
              ? theme.green
              : theme.danger,
          height: SCREEN_HEIGHT * 0.22,
          padding: dimens.tiny,
        }}>
        <SwitchTransactionType
          showLabel
          value={transactionType}
          colorLabel="white"
          onChange={handleChangeTransactionType}
        />
        <View>
          <Caption align="center" color="white">
            Valor
          </Caption>
          <Input
            color="white"
            size="headLine"
            control={control}
            name="value"
            borderColor="white"
            keyboardType="decimal-pad"
            defaultValue={String(0)}
            alignError="center"
          />
        </View>
      </View>
      <View style={{ padding: dimens.small }}>
        <View>
          <Input
            label="Descrição"
            name="description"
            defaultValue="teste"
            control={control}
            placeholder="Adicione uma descrição"
          />
        </View>
        <Divide stylesDivide={{ marginVertical: dimens.base }} />
        <SelectDate onChangeDate={handleSetDate} />
        <Divide stylesDivide={{ marginVertical: dimens.base }} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.white,
            ...getShadow(3),
            padding: dimens.tiny,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
          onPress={handlePressSelectCateogry}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <CategoryIcon
              icon={category ? category.icon : "grid-large"}
              color={category ? category.color : theme.primary}
            />
            <Body style={{ marginLeft: dimens.tiny }}>
              {category ? category.name : "Selecione a categoria"}
            </Body>
          </View>
          {category && <Icon name="x-circle" size={18} color={theme.danger} />}
        </TouchableOpacity>
        <Divide stylesDivide={{ marginVertical: dimens.base }} />

        <Switch
          options={[
            {
              text: "Recorrência",
              value: TRANSACTION_OPTIONS.RECURRENCE,
            },
            {
              text: "Repetir",
              value: TRANSACTION_OPTIONS.INSTALLMENT,
            },
          ]}
          onChange={handleChangeTransactionOption}
          value="value2"
        />
        {transactionOption === TRANSACTION_OPTIONS.RECURRENCE && (
          <View style={{ marginVertical: dimens.medium }}>
            <Body
              align="center"
              color={
                TRANSACTION_TYPE.EXPENSE === transactionType
                  ? "danger"
                  : "green"
              }>
              Esse lançamento será feito 1 vêz por mês na data informada.
            </Body>
          </View>
        )}
        {transactionOption === TRANSACTION_OPTIONS.INSTALLMENT && (
          <SelectPeriod />
        )}

        <CustomButton
          loading={false}
          title="Registrar"
          backgroundColor={
            transactionType === TRANSACTION_TYPE.EXPENSE ? "danger" : "green"
          }
          styleButton={{ marginTop: dimens.base }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

export default TransactionForm;
