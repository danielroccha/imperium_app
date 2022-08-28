import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import I18n from "@app/languages/I18n";

import Input from "@app/components/atoms/Input";
import Card from "@app/components/atoms/Card";
import CustomButton from "@app/components/atoms/Button";
import { dimens } from "@app/configs/Theme";
import Util from "@app/util";

export type TChangePasswordForm = {
  password: string;
  confirmPassword: string;
};

type ChangePasswordFormFormProps = {
  onValidateSuccess: (data: TChangePasswordForm) => void;
  loading: boolean;
};

const ChangePasswordForm = ({
  onValidateSuccess,
  loading,
}: ChangePasswordFormFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordForm>({
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .required(I18n.t("fields_validation.password_empty"))
          .min(6, I18n.t("fields_validation.password_length")),
        confirmPassword: yup
          .string()
          .required(I18n.t("fields_validation.confirm_password"))
          .min(6, I18n.t("fields_validation.password_length")),
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
          label={I18n.t("fields.password")}
          placeholder={I18n.t("placeholders.password")}
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
          label={I18n.t("fields.confirm_password")}
          placeholder={I18n.t("placeholders.confirm_password")}
          secureTextEntry
        />
      </View>
      <CustomButton
        loading={loading}
        title={I18n.t("buttons.reset_password")}
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default ChangePasswordForm;
