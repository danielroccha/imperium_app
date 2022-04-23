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
import CustomButton from "@app/components/atoms/Button";
import Card from "@app/components/atoms/Card";
import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import Input from "@app/components/atoms/Input";
import { Caption } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";

import styles from "./styles";

const Login = () => {
  const navigation = useNavigation();
  const theme = colors();

  const handleNavigateCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).container}>
        <View style={{}}>
          <Image source={images.brandLettering} style={styles(theme).image} />
          <Card style={{ padding: dimens.base }}>
            <Input
              icon="mail"
              label="Email"
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={{ marginTop: dimens.small }}>
              <Input
                icon="key"
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
              />
            </View>
          </Card>
          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            styleButton={{ marginTop: dimens.xlarge }}
          />
        </View>
        <Divide />
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
