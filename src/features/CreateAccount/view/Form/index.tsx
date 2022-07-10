import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@app/components/atoms/Input";
import Card from "@app/components/atoms/Card";
import { TCreateAccountViewModel } from "../createAccountViewModel";
import CustomButton from "@app/components/atoms/Button";
import { dimens } from "@app/configs/Theme";
import Util from "@app/util";

type CreateAccountFormProps = {
  onValidateSuccess: (data: TCreateAccountViewModel) => void;
  loading: boolean;
};

const CreateAccountForm = ({
  onValidateSuccess,
  loading,
}: CreateAccountFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateAccountViewModel>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Preencha o campo nome"),
        email: yup
          .string()
          .email("Digite um email válido")
          .required("Preencha o campo email"),
        password: yup
          .string()
          .required("Preencha o campo senha")
          .min(6, "Senha precisa ter ao menos 6 caracteres"),
      }),
    ),
  });

  const onSubmit = (data: TCreateAccountViewModel) => {
    if (data.name.split(" ").length < 2) {
      Util.showAlertError("Ops!", "Coloque seu nome e sobrenome");
    } else {
      onValidateSuccess(data);
    }
  };

  return (
    <Card style={{ padding: dimens.base }}>
      <Input
        control={control}
        error={!!errors.name}
        errorMessage={errors.name?.message}
        name="name"
        icon="user"
        label="Nome e sobrenome"
        placeholder="Digite nome e sobrenome"
        autoCapitalize="words"
      />
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
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.password}
          errorMessage={errors.password?.message}
          name="password"
          icon="key"
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </View>
      <CustomButton
        loading={loading}
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default CreateAccountForm;
