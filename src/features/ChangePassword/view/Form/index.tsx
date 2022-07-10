import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@app/components/atoms/Input";
import Card from "@app/components/atoms/Card";
import CustomButton from "@app/components/atoms/Button";
import { dimens } from "@app/configs/Theme";
import Util from "@app/util";

export type TChangePasswordForm = {
  password: string;
  confirmPassword: string;
};

type CreateAccountFormProps = {
  onValidateSuccess: (data: TChangePasswordForm) => void;
  loading: boolean;
};

const ChangePasswordForm = ({
  onValidateSuccess,
  loading,
}: CreateAccountFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordForm>({
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .required("Preencha o campo senha")
          .min(6, "Senha precisa ter ao menos 6 caracteres"),
        confirmPassword: yup
          .string()
          .required("Preencha o campo senha")
          .min(6, "Senha precisa ter ao menos 6 caracteres"),
      }),
    ),
  });

  const onSubmit = (data: TChangePasswordForm) => {
    if (data.password !== data.confirmPassword) {
      Util.showAlertError("Ops!", "As senhas não são iguais.");
    } else {
      onValidateSuccess(data);
    }
  };

  return (
    <Card style={{ padding: dimens.base }}>
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.password}
          errorMessage={errors.password?.message}
          name="password"
          icon="key"
          label="Nova senha"
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
          secureTextEntry
        />
      </View>
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          name="confirmPassword"
          icon="key"
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          secureTextEntry
        />
      </View>
      <CustomButton
        loading={loading}
        title="Alterar senha"
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default ChangePasswordForm;
