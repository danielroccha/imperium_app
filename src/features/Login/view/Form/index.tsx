import React from "react";
import { View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import I18n from "@app/languages/I18n";

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
          .email(I18n.t("fields_validation.email_error"))
          .required(I18n.t("fields_validation.email_empty")),
        password: yup
          .string()
          .required(I18n.t("fields_validation.password_empty")),
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
          label={I18n.t("fields.email")}
          placeholder={I18n.t("placeholders.email")}
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
            label={I18n.t("fields.password")}
            placeholder={I18n.t("placeholders.password")}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        </View>
      </Card>

      <CustomButton
        loading={loading}
        title={I18n.t("buttons.enter")}
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.xlarge }}
      />
    </>
  );
};

export default LoginForm;
