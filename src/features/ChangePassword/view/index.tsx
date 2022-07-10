import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import { Caption } from "@app/components/atoms/Text";

import ChangePasswordForm, {
  TChangePasswordForm,
} from "@app/features/ChangePassword/view/Form";
import { useChangePasswordViewModel } from "@app/features/ChangePassword/view/changePasswordViewModel";

import { images } from "@app/assets";
import { colors } from "@app/configs/Theme";

import useProfileRepository from "@app/features/Profile/data/profileRepository";
import userService from "@app/services/user";
import styles from "./styles";

type ChangePasswordParamList = {
  Detail: {
    email: string;
    verificationCode: string;
  };
};

const ChangePassword = () => {
  const navigation = useNavigation();
  const theme = colors();

  const route = useRoute<RouteProp<ChangePasswordParamList>>();

  const { email, verificationCode } = route.params;

  const profileRepository = useProfileRepository(userService);

  const { changePassword, isLoading } =
    useChangePasswordViewModel(profileRepository);

  const handleNavigateCreateAccount = () => {
    navigation.goBack();
  };

  const handleSuccessFormCreateAccount = (data: TChangePasswordForm) => {
    const { password } = data;
    changePassword({
      email,
      password,
      verificationCode: Number(verificationCode),
    });
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).container}>
        <View>
          <Image source={images.brandLettering} style={styles(theme).image} />
          <ChangePasswordForm
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

export default ChangePassword;
