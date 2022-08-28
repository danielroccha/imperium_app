import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import { Caption } from "@app/components/atoms/Text";
import NavBar from "@app/components/organisms/Navbar";

import I18n from "@app/languages/I18n";

import CreateAccountForm from "@app/features/CreateAccount/view/Form";
import {
  TCreateAccountViewModel,
  useCreateAccountViewModel,
} from "@app/features/CreateAccount/view/createAccountViewModel";
import useCreateAccountRepository from "@app/features/CreateAccount/data/createAccountRepository";
import signUpService from "@app/services/createAccout";

import { images } from "@app/assets";
import { colors, dimens } from "@app/configs/Theme";

import styles from "./styles";

const CreateAccount = () => {
  const navigation = useNavigation();
  const theme = colors();

  const createAccountRepository = useCreateAccountRepository(signUpService);

  const { createAccount, isLoading } = useCreateAccountViewModel(
    createAccountRepository,
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSuccessFormCreateAccount = (data: TCreateAccountViewModel) => {
    createAccount(data);
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <NavBar iconRight="x" onClickActionRight={handleBack} />
        <ScrollView
          style={{ backgroundColor: colors().mode }}
          contentContainerStyle={{ padding: dimens.small }}>
          <View>
            <Image source={images.brandLettering} style={styles(theme).image} />
            <CreateAccountForm
              loading={isLoading}
              onValidateSuccess={handleSuccessFormCreateAccount}
            />
          </View>
          <Divide stylesDivide={{ marginVertical: dimens.medium }} />
          <TouchableOpacity onPress={handleBack}>
            <Caption align="center" color="black">
              {I18n.t("create_account.back_to_login")}
            </Caption>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </DismissKeyboard>
  );
};

export default CreateAccount;
