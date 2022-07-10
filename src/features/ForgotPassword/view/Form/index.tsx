import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@app/components/atoms/Input";
import Card from "@app/components/atoms/Card";
import CustomButton from "@app/components/atoms/Button";
import { dimens } from "@app/configs/Theme";

type ForgotPasswordForm = {
  email: string;
};

type ForgotPasswordFormProps = {
  onValidateSuccess: (data: ForgotPasswordForm) => void;
  loading: boolean;
};

const ForgotPasswordForm = ({
  onValidateSuccess,
  loading,
}: ForgotPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Digite um email válido")
          .required("Preencha o campo email"),
      }),
    ),
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    onValidateSuccess(data);
  };

  return (
    <Card style={{ padding: dimens.base }}>
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          name="email"
          icon="mail"
          label="Email"
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <CustomButton
        loading={loading}
        title="Enviar"
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default ForgotPasswordForm;
