import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { images } from "@app/assets";
import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import { Caption } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";
import loginService from "@app/services/login";

import styles from "./styles";
import useLoginRepository from "../data/loginRepository";
import { TLoginViewModel, useLoginViewModel } from "./loginViewModel";
import LoginForm from "./Form";
import RootStackNavigation from "@app/types/RootStackParams";

const Login = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const theme = colors();

  const loginRepository = useLoginRepository(loginService);
  const { isLoading, tryLogin } = useLoginViewModel(loginRepository);

  const handleNavigateCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const handleNavigateForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleLogin = (data: TLoginViewModel) => {
    tryLogin({ email: data.email, password: data.password });
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).container}>
        <View>
          <Image source={images.brandLettering} style={styles(theme).image} />
          <LoginForm onValidateSuccess={handleLogin} loading={isLoading} />
        </View>
        <Divide />

        <TouchableOpacity onPress={handleNavigateForgotPassword}>
          <Caption align="center" color="primary">
            Esqueci minha senha
          </Caption>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateCreateAccount}>
          <Caption align="center" color="black">
            É novo por aqui? Crie sua conta agora.
          </Caption>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default Login;
