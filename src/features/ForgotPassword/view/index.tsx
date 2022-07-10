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

import { useForgotPasswordViewModel } from "@app/features/ForgotPassword/view/forgotPasswordViewModel";

import { TForgotPasswordViewModel } from "@app/features/ForgotPassword/view/forgotPasswordViewModel";

import { images } from "@app/assets";
import { colors } from "@app/configs/Theme";

import styles from "./styles";
import ForgotPasswordForm from "./Form";
import useProfileRepository from "@app/features/Profile/data/profileRepository";
import userService from "@app/services/user";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const theme = colors();

  const profileRepository = useProfileRepository(userService);

  const { send, isLoading } = useForgotPasswordViewModel(profileRepository);

  const handleNavigateCreateAccount = () => {
    navigation.goBack();
  };

  const handleSuccessFormCreateAccount = (data: TForgotPasswordViewModel) => {
    send(data);
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).container}>
        <View>
          <Image source={images.brandLettering} style={styles(theme).image} />
          <ForgotPasswordForm
            loading={isLoading}
            onValidateSuccess={handleSuccessFormCreateAccount}
          />
        </View>
        <Divide />
        <TouchableOpacity onPress={handleNavigateCreateAccount}>
          <Caption align="center" color="black">
            Se você ja tem uma conta é só fazer seu login:)
          </Caption>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default ForgotPassword;
