import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/Feather";

import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import CustomButton from "@app/components/atoms/Button";
import { colors, dimens, getShadow } from "@app/configs/Theme";
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
  category?: ICategoryModel;
  repeat?: number;
  repeatType?: OPTIONS_PERIOD;
} & TTransactionFormYup;

type TransactionFormProps = {
  onValidateSuccess: (data: TTransactionForm) => void;
  loading: boolean;
  showAdvancedOptions: boolean;
  dataForm?: TTransactionForm;
  edit?: boolean;
};

const TransactionForm = ({
  onValidateSuccess,
  loading,
  showAdvancedOptions = true,
  dataForm,
  edit = false,
}: TransactionFormProps) => {
  const theme = colors();
  const navigation = useNavigation<RootStackNavigation>();

  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.EXPENSE,
  );
  const [transactionValue, setTransactionValue] = useState<string>();

  const [date, setDate] = useState(new Date());

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

    if (transactionValue === undefined || transactionValue === "0") {
      return Util.showAlertError("Preecha os campos", "Adicione um valor");
    } else if (description === "" || description === undefined) {
      return Util.showAlertError("Preecha os campos", "Adicione uma descrição");
    } else if (category === null || category === undefined) {
      return Util.showAlertError(
        "Preecha os campos",
        "Selecione uma categoria",
      );
    } else if (date === undefined) {
      return Util.showAlertError("Preecha os campos", "Selecione uma data");
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
        type: transactionType,
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
    if (dataForm) {
      setTransactionType(dataForm.transactionType);
      setTransactionValue(String(dataForm.value));
      setDate(dataForm.date);
      setCategory(dataForm.category);
    }
  }, [dataForm]);

  useEffect(() => {
    reset(dataForm);
  }, [dataForm, reset]);

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: dimens.xlarge }}>
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor:
                transactionType == TRANSACTION_TYPE.INCOME
                  ? theme.green
                  : theme.danger,
              height: 200,
              padding: dimens.tiny,
            }}>
            {edit ? (
              <View style={{ marginTop: dimens.medium }}>
                <Switch
                  options={[
                    {
                      text:
                        dataForm?.transactionType === TRANSACTION_TYPE.EXPENSE
                          ? "Despesa"
                          : "Receita",
                      value:
                        dataForm?.transactionType ?? TRANSACTION_TYPE.EXPENSE,
                      color:
                        dataForm?.transactionType === TRANSACTION_TYPE.EXPENSE
                          ? theme.danger
                          : theme.green,
                    },
                  ]}
                  disableSwitchTypeTransaction
                  value={dataForm?.transactionType}
                  onChange={handleChangeTransactionOption}
                  colorLabel="green"
                />
              </View>
            ) : (
              <SwitchTransactionType
                showLabel
                disableSwitchTypeTransaction={edit}
                value={transactionType}
                colorLabel="white"
                onChange={handleChangeTransactionType}
              />
            )}

            <View>
              <Caption align="center" color="white">
                Valor
              </Caption>
              <InputMoney
                defaultValue={transactionValue}
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
            {edit ? (
              <>
                <Caption color="primary">
                  {`Data: ${new Date(
                    dataForm?.date ?? "",
                  ).toLocaleDateString()}`}
                </Caption>
                <Caption color="primary">
                  <Caption>A data está errada ?</Caption> É só apagar e criar um
                  novo.
                </Caption>
              </>
            ) : (
              <>
                <SelectDate onChangeDate={handleSetDate} initialDate={date} />
              </>
            )}
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
              title={edit ? "Alterar" : "Registrar"}
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
