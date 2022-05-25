import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/Feather";

import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import CustomButton from "@app/components/atoms/Button";
import { colors, dimens, getShadow, SCREEN_HEIGHT } from "@app/configs/Theme";
import Input from "@app/components/atoms/Input";
import { useForm } from "react-hook-form";
import { Body, Caption } from "@app/components/atoms/Text";
import {
  OPTIONS_PERIOD,
  TRANSACTION_OPTIONS,
  TRANSACTION_TYPE,
} from "@app/constants";
import SelectDate from "@app/components/organisms/SelectDate";
import Switch from "@app/components/molecules/Switch";
import SelectPeriod from "@app/components/organisms/SelectPeriod";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import CategoryIcon from "@app/components/molecules/CategoryIcon";
import Divide from "@app/components/atoms/Divide";
import InputMoney from "@app/components/atoms/InputMoney";
import Util from "@app/util";

type TTransactionFormYup = {
  description: string;
};

export type TTransactionForm = {
  transactionType: TRANSACTION_TYPE;
  value: number;
  date: Date;
  category: ICategoryModel;
  repeat?: number;
  repeatType?: OPTIONS_PERIOD;
} & TTransactionFormYup;

type TransactionFormProps = {
  onValidateSuccess: (data: TTransactionForm) => void;
  loading: boolean;
  showAdvancedOptions: boolean;
  dataForm?: TTransactionForm;
};

const TransactionForm = ({
  onValidateSuccess,
  loading,
  showAdvancedOptions = true,
  dataForm,
}: TransactionFormProps) => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.EXPENSE,
  );
  const [transactionValue, setTransactionValue] = useState("");

  const [date, setDate] = useState<Date>();

  const [category, setCategory] = useState<ICategoryModel | null>();

  const [transactionOption, setTransactionOption] = useState("");

  const [repeat, setRepeat] = useState(0);

  const [repeatType, setRepeatType] = useState<OPTIONS_PERIOD>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TTransactionFormYup>({
    resolver: yupResolver(
      yup.object().shape({
        description: yup.string(),
      }),
    ),
  });

  const onSubmit = (data: TTransactionFormYup) => {
    const { description } = data;

    if (category === null || category === undefined) {
      return Util.showAlertError(
        "Preecha os campos",
        "Selecione uma categoria",
      );
    } else if (date === undefined) {
      return Util.showAlertError("Preecha os campos", "Selecione uma data");
    } else if (transactionValue === "" || transactionValue === "0") {
      return Util.showAlertError("Preecha os campos", "Adicione um valor");
    } else if (description === "") {
      return Util.showAlertError("Preecha os campos", "Adicione uma descrição");
    }

    onValidateSuccess({
      category,
      date,
      description,
      transactionType,
      value: Number(transactionValue),
      repeat,
      repeatType,
    });
  };

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

  const handleChangeRepeat = (value: number) => {
    setRepeat(value);
  };

  const handleChangeRepeatType = (value: OPTIONS_PERIOD) => {
    setRepeatType(value);
  };

  const handleSelectCategory = (data: ICategoryModel) => {
    setCategory(data);
  };

  const handleChangeValue = (value: string) => {
    setTransactionValue(value);
  };

  useEffect(() => {
    if (
      dataForm?.category &&
      dataForm.date &&
      dataForm.description &&
      dataForm.transactionType
    ) {
      setTransactionType(dataForm.transactionType);
      setCategory(dataForm.category);
      setDate(dataForm.date);
      setTransactionValue(String(dataForm.value));
    }
  }, [dataForm]);

  useEffect(() => {
    reset(dataForm);
  }, [dataForm, reset]);

  return (
    <View>
      <ScrollView>
        <View>
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
              <InputMoney
                keyboardType="decimal-pad"
                color="white"
                onChangeText={handleChangeValue}
              />
            </View>
          </View>
          <View style={{ padding: dimens.small }}>
            <View>
              <Input
                label="Descrição"
                name="description"
                value="teste"
                control={control}
                placeholder="Adicione uma descrição"
                error={!!errors.description}
                errorMessage={errors.description?.message}
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
              {category && (
                <Icon name="x-circle" size={18} color={theme.danger} />
              )}
            </TouchableOpacity>
            <Divide stylesDivide={{ marginVertical: dimens.base }} />

            {showAdvancedOptions && (
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
              />
            )}

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
              <SelectPeriod
                onSelectRepeatType={handleChangeRepeatType}
                onChangeRepeat={handleChangeRepeat}
              />
            )}

            <CustomButton
              loading={loading}
              title="Registrar"
              backgroundColor={
                transactionType === TRANSACTION_TYPE.EXPENSE
                  ? "danger"
                  : "green"
              }
              styleButton={{ marginTop: dimens.base }}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionForm;
