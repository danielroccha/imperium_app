import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import { Caption } from "@app/components/atoms/Text";

import CreateAccountForm from "@app/features/CreateAccount/view/Form";
import {
  TCreateAccountViewModel,
  useCreateAccountViewModel,
} from "@app/features/CreateAccount/view/createAccountViewModel";
import useCreateAccountRepository from "@app/features/CreateAccount/data/createAccountRepository";
import signUpService from "@app/services/createAccout";

import { images } from "@app/assets";
import { colors } from "@app/configs/Theme";

import styles from "./styles";

const CreateAccount = () => {
  const navigation = useNavigation();
  const theme = colors();

  const createAccountRepository = useCreateAccountRepository(signUpService);

  const { createAccount, isLoading } = useCreateAccountViewModel(
    createAccountRepository,
  );

  const handleNavigateCreateAccount = () => {
    navigation.goBack();
  };

  const handleSuccessFormCreateAccount = (data: TCreateAccountViewModel) => {
    createAccount(data);
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).container}>
        <View>
          <Image source={images.brandLettering} style={styles(theme).image} />
          <CreateAccountForm
            loading={isLoading}
            onValidateSuccess={handleSuccessFormCreateAccount}
          />
        </View>
        <Divide />
        <TouchableOpacity onPress={handleNavigateCreateAccount}>
          <Caption align="center" color="black">
            Se você já tem uma conta é só fazer seu login:)
          </Caption>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default CreateAccount;
