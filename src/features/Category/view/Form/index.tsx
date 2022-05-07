import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Input from "@app/components/atoms/Input";
import { dimens } from "@app/configs/Theme";
import CustomButton from "@app/components/atoms/Button";
import SwitchTransactionType from "@app/components/molecules/SwitchTransactionType";
import Divide from "@app/components/atoms/Divide";
import ImagesSugestion from "@app/components/molecules/ImagesSugestion";
import ColorsSugestion from "@app/components/molecules/ColorsSugestion";
import { TRANSACTION_TYPE } from "@app/constants";
import { ColorsPropType } from "@app/types/ThemeType";

type TCategoryFormYup = {
  name: string;
};

type TCategoryForm = {
  type: TRANSACTION_TYPE;
  color: string;
  icon: string;
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

  const [transactionTypeError, setTransactionTypeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCategoryFormYup>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Preencha o campo nome categoria"),
      }),
    ),
  });

  const handlePickColor = useCallback((value: string) => {
    setColorSelected(value);
    setColorError(false);
  }, []);

  const handlePickImage = useCallback((value: string) => {
    setImageSelected(value);
    setImageError(false);
  }, []);

  const handleChangeTransactionType = useCallback((value: string) => {
    setTransactionTypeSelected(
      value === TRANSACTION_TYPE.EXPENSE
        ? TRANSACTION_TYPE.EXPENSE
        : TRANSACTION_TYPE.INCOME,
    );
    setTransactionTypeError(false);
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
        setTransactionTypeError(true);
      } else if (colorSelected === "") {
        setColorError(true);
      } else if (imageSelected === "") {
        setImageError(true);
      } else {
        onValidateSuccess({
          ...dataForm,
          color: colorSelected,
          icon: imageSelected,
          type:
            transactionTypeSelected === TRANSACTION_TYPE.EXPENSE
              ? TRANSACTION_TYPE.EXPENSE
              : TRANSACTION_TYPE.INCOME,
        });
      }
    },
    [onValidateSuccess, colorSelected, imageSelected, transactionTypeSelected],
  );

  useEffect(() => {
    if (data?.icon && data?.color && data?.type) {
      setTransactionTypeSelected(data?.type);
      setColorSelected(data?.color);
      setImageSelected(data?.icon);
    }
  }, [data?.icon, data?.color, data?.type]);

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <>
      <SwitchTransactionType
        showLabel
        value={data?.type}
        error={transactionTypeError}
        onChange={handleChangeTransactionType}
        disableSwitchTypeTransaction={disableSwitchTypeTransaction}
      />

      <View style={{ marginTop: dimens.base, paddingHorizontal: dimens.small }}>
        <Input
          error={!!errors.name}
          name="name"
          control={control}
          autoFocus
          label="Nome da categoria"
          placeholder={"Escreva o nome da nova categoria"}
          errorMessage={errors.name?.message}
        />
      </View>

      <Divide stylesDivide={{ marginTop: dimens.base }} />
      <ColorsSugestion
        value={data?.color}
        error={colorError}
        onChange={handlePickColor}
      />
      <Divide stylesDivide={{ marginTop: dimens.base }} />
      <View style={{ paddingHorizontal: dimens.small }}>
        <ImagesSugestion
          value={data?.icon}
          error={imageError}
          onChange={handlePickImage}
          color={colorSelected}
        />

        <CustomButton
          loading={loading}
          title="Salvar"
          onPress={handleSubmit(onSubmit)}
          backgroundColor={getColorButton()}
          styleButton={{ marginTop: dimens.base }}
        />
      </View>
    </>
  );
};

export default CategoryForm;