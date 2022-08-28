import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import I18n from "@app/languages/I18n";

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
        name: yup.string().required(I18n.t("fields_validation.name_error")),
        email: yup
          .string()
          .email(I18n.t("fields_validation.email_empty"))
          .required(I18n.t("fields_validation.email_error")),
        password: yup
          .string()
          .required(I18n.t("fields_validation.password_empty"))
          .min(6, "Senha precisa ter ao menos 6 caracteres"),
      }),
    ),
  });

  const onSubmit = (data: TCreateAccountViewModel) => {
    if (data.name.split(" ").length < 2) {
      Util.showAlertError(
        I18n.t("common.ooops"),
        I18n.t("fields_validation.name_error"),
      );
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
        label={I18n.t("fields.name_and_lastname")}
        placeholder={I18n.t("placeholders.name_and_lastname")}
        autoCapitalize="words"
        autoCorrect={false}
        spellCheck={false}
      />
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
      <View style={{ marginTop: dimens.small }}>
        <Input
          control={control}
          error={!!errors.password}
          errorMessage={errors.password?.message}
          name="password"
          icon="key"
          label={I18n.t("fields.password")}
          placeholder={I18n.t("placeholders.password")}
          secureTextEntry
        />
      </View>
      <CustomButton
        loading={loading}
        title={I18n.t("buttons.create_account")}
        onPress={handleSubmit(onSubmit)}
        styleButton={{ marginTop: dimens.medium }}
      />
    </Card>
  );
};

export default CreateAccountForm;
