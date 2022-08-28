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
import { Caption } from "@app/components/atoms/Text";

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
          .email(I18n.t("fields_validation.email_error"))
          .required(I18n.t("fields_validation.email_empty")),
      }),
    ),
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    onValidateSuccess(data);
  };

  return (
    <Card style={{ padding: dimens.base }}>
      <Caption align="center">{I18n.t("forgot_password.instructions")}</Caption>
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          name="email"
          icon="mail"
          label={I18n.t("fields.email")}
          placeholder={I18n.t("placeholders.email")}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <CustomButton
        loading={loading}
        title={I18n.t("buttons.send")}
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default ForgotPasswordForm;
