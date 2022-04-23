import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { images } from "@app/assets";
import CustomButton from "@app/components/atoms/Button";
import Card from "@app/components/atoms/Card";
import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import Divide from "@app/components/atoms/Divide";
import Input from "@app/components/atoms/Input";
import { Caption } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CreateAccount = () => {
  const navigation = useNavigation();
  const theme = colors();

  const handleNavigateCreateAccount = () => {
    console.log("teste");
    navigation.goBack();
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
              icon="user"
              label="Nome Completo"
              placeholder="Digite seu email"
              keyboardType="name-phone-pad"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <View style={{ marginTop: dimens.small }}>
              <Input
                icon="mail"
                label="Email"
                placeholder="Digite sua senha"
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: dimens.small }}>
              <Input
                icon="key"
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: dimens.small }}>
              <Input
                icon="key"
                label="Confirmar senha"
                placeholder="Digite sua senha"
                secureTextEntry
              />
            </View>
          </Card>
          <CustomButton
            title="Entrar"
            onPress={handleNavigateCreateAccount}
            styleButton={{ marginTop: dimens.xlarge }}
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

export default CreateAccount;
