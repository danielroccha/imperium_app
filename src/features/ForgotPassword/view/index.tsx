import React from "react";
import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DismissKeyboard from "@app/components/atoms/DismissKeyboard";

import { useForgotPasswordViewModel } from "@app/features/ForgotPassword/view/forgotPasswordViewModel";

import { TForgotPasswordViewModel } from "@app/features/ForgotPassword/view/forgotPasswordViewModel";

import { images } from "@app/assets";
import { colors } from "@app/configs/Theme";

import styles from "./styles";
import ForgotPasswordForm from "./Form";
import useProfileRepository from "@app/features/Profile/data/profileRepository";
import userService from "@app/services/user";
import NavBar from "@app/components/organisms/Navbar";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const theme = colors();

  const profileRepository = useProfileRepository(userService);

  const { send, isLoading } = useForgotPasswordViewModel(profileRepository);

  const handleSuccessFormCreateAccount = (data: TForgotPasswordViewModel) => {
    send(data);
  };

  const handleTapAction = () => {
    navigation.goBack();
  };

  return (
    <>
      <NavBar iconRight="x" onClickActionRight={handleTapAction} />
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
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default ForgotPassword;
