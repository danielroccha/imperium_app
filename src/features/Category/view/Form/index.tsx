import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import I18n from "@app/languages/I18n";

import Input from "@app/components/atoms/Input";
import CustomButton from "@app/components/atoms/Button";
import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import Divide from "@app/components/atoms/Divide";
import ImagesSugestion from "@app/components/molecules/ImagesSugestion";
import ColorsSugestion from "@app/components/molecules/ColorsSugestion";
import InputMoney from "@app/components/atoms/InputMoney";
import { Body } from "@app/components/atoms/Text";

import { TRANSACTION_TYPE } from "@app/constants";
import { ColorsPropType } from "@app/types/ThemeType";
import { dimens } from "@app/configs/Theme";
import Util from "@app/util";

type TCategoryFormYup = {
  name: string;
};

type TCategoryForm = {
  type: TRANSACTION_TYPE;
  color: string;
  icon: string;
  value?: number;
};

export type TCategoryFullForm = TCategoryFormYup & TCategoryForm;

type CategoryFormProps = {
  loading: boolean;
  onValidateSuccess: (data: TCategoryFullForm) => void;
  data?: TCategoryFullForm;
  disableSwitchTypeTransaction?: boolean;
};

const CategoryForm = ({
  onValidateSuccess,
  loading,
  data,
  disableSwitchTypeTransaction,
}: CategoryFormProps) => {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [categoryLimit, setCategoryLimit] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCategoryFormYup>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(I18n.t("fields_validation.category_name")),
      }),
    ),
  });

  const handlePickColor = useCallback((value: string) => {
    setColorSelected(value);
  }, []);

  const handlePickImage = useCallback((value: string) => {
    setImageSelected(value);
  }, []);

  const handleChangeValue = (value: string) => {
    setCategoryLimit(value);
  };

  const handleChangeTransactionType = useCallback((value: string) => {
    setTransactionTypeSelected(
      value === TRANSACTION_TYPE.EXPENSE
        ? TRANSACTION_TYPE.EXPENSE
        : TRANSACTION_TYPE.INCOME,
    );
  }, []);

  const getColorButton = useCallback((): ColorsPropType => {
    if (transactionTypeSelected === TRANSACTION_TYPE.EXPENSE) {
      return "danger";
    } else if (transactionTypeSelected === TRANSACTION_TYPE.INCOME) {
      return "green";
    } else {
      return "primary";
    }
  }, [transactionTypeSelected]);

  const onSubmit = useCallback(
    (dataForm: TCategoryFormYup) => {
      if (transactionTypeSelected === "") {
        Util.showAlertError(
          I18n.t("fields.fill_fields"),
          I18n.t("fields.choose_a_type"),
        );
      } else if (colorSelected === "") {
        Util.showAlertError(
          I18n.t("fields.fill_fields"),
          I18n.t("fields.choose_a_color"),
        );
      } else if (imageSelected === "") {
        Util.showAlertError(
          I18n.t("fields.fill_fields"),
          I18n.t("fields.choose_a_image"),
        );
      } else {
        onValidateSuccess({
          ...dataForm,
          color: colorSelected,
          icon: imageSelected,
          value: Number(categoryLimit),
          type:
            transactionTypeSelected === TRANSACTION_TYPE.EXPENSE
              ? TRANSACTION_TYPE.EXPENSE
              : TRANSACTION_TYPE.INCOME,
        });
      }
    },
    [
      onValidateSuccess,
      colorSelected,
      imageSelected,
      transactionTypeSelected,
      categoryLimit,
    ],
  );

  useEffect(() => {
    if (data?.icon && data?.color && data?.type) {
      setTransactionTypeSelected(data?.type);
      setColorSelected(data?.color);
      setImageSelected(data?.icon);
    }

    if (data?.value) setCategoryLimit(String(data.value));
  }, [data?.icon, data?.color, data?.type, data?.value]);

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: dimens.xlarge,
        }}>
        <SwitchTransactionType
          showLabel
          value={data?.type}
          onChange={handleChangeTransactionType}
          disableSwitchTypeTransaction={disableSwitchTypeTransaction}
        />

        <View
          style={{ marginTop: dimens.base, paddingHorizontal: dimens.small }}>
          <Input
            error={!!errors.name}
            name="name"
            control={control}
            autoFocus
            label={I18n.t("fields.category")}
            placeholder={I18n.t("placeholders.category")}
            errorMessage={errors.name?.message}
          />
        </View>
        {transactionTypeSelected === TRANSACTION_TYPE.EXPENSE && (
          <>
            <Divide stylesDivide={{ marginVertical: dimens.base }} />
            <View
              style={{ paddingHorizontal: dimens.small, alignItems: "center" }}>
              <Body align="center">
                {I18n.t("categories.set_spending_limit_for_that_category")}
              </Body>
              <InputMoney
                defaultValue={categoryLimit}
                keyboardType="decimal-pad"
                color="primary"
                onChangeText={handleChangeValue}
              />
            </View>
          </>
        )}

        <Divide stylesDivide={{ marginTop: dimens.base }} />
        <ColorsSugestion value={data?.color} onChange={handlePickColor} />
        <Divide stylesDivide={{ marginTop: dimens.base }} />
        <View style={{ paddingHorizontal: dimens.small }}>
          <ImagesSugestion
            value={data?.icon}
            onChange={handlePickImage}
            color={colorSelected}
          />

          <CustomButton
            loading={loading}
            title={I18n.t("buttons.save")}
            onPress={handleSubmit(onSubmit)}
            backgroundColor={getColorButton()}
            styleButton={{ marginTop: dimens.base }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default CategoryForm;
