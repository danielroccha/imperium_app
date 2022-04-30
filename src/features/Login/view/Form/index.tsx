import React from "react";
import { View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@app/components/atoms/Input";
import { dimens } from "@app/configs/Theme";
import { useForm } from "react-hook-form";
import CustomButton from "@app/components/atoms/Button";
import Card from "@app/components/atoms/Card";
import { TLoginViewModel } from "../loginViewModel";

type LoginFormProps = {
  loading: boolean;
  onValidateSuccess: (data: TLoginViewModel) => void;
};

const LoginForm = ({ onValidateSuccess, loading }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginViewModel>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Digite um email válido")
          .required("Preencha o campo email"),
        password: yup.string().required("Preencha o campo senha"),
      }),
    ),
  });

  const onSubmit = (data: TLoginViewModel) => {
    onValidateSuccess(data);
  };

  return (
    <>
      <Card style={{ padding: dimens.base }}>
        <Input
          error={!!errors.email}
          name="email"
          icon="mail"
          control={control}
          label="Email"
          placeholder={"Digite seu email"}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={errors.email?.message}
        />
        <View style={{ marginTop: dimens.small }}>
          <Input
            error={!!errors.password}
            name="password"
            icon="key"
            control={control}
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        </View>
      </Card>

      <CustomButton
        loading={loading}
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.xlarge }}
      />
    </>
  );
};

export default LoginForm;
