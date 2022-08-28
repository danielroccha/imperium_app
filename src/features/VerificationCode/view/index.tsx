import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";

import useProfileRepository from "@app/features/Profile/data/profileRepository";
import userService from "@app/services/user";
import { useVerificationCodeViewModel } from "@app/features/VerificationCode/view/verificationCodeViewModel";

import LottieViewComponent from "@app/components/molecules/LottieViewComponent";
import CustomButton from "@app/components/atoms/Button";
import CountDown from "@app/components/organisms/CountDown";
import Card from "@app/components/atoms/Card";
import { Body, Caption, Regular, Subtitle } from "@app/components/atoms/Text";
import { colors, dimens } from "@app/configs/Theme";

import { lotties } from "@app/assets";
import DismissKeyboard from "@app/components/atoms/DismissKeyboard";
import { TEMAIL_TEMPLATE } from "@app/types";
import styles from "./styles";

const CELL_COUNT = 6;

type VerificationCodeParamList = {
  Detail: {
    email: string;
    title: string;
    emailType: TEMAIL_TEMPLATE;
    callback: () => void;
  };
};

const VerificationCode = () => {
  const [value, setValue] = useState("");
  const [showCountDown, setShowCountDown] = useState(true);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const route = useRoute<RouteProp<VerificationCodeParamList>>();
  const { email, title, emailType, callback } = route.params;

  const profileRepository = useProfileRepository(userService);

  const { verificationCode, resendVerificationCodeEmail, isLoading } =
    useVerificationCodeViewModel(profileRepository);

  const handlePress = () => {
    verificationCode({ code: Number(value), email }, callback);
  };

  const handleFinishCountDown = () => {
    setShowCountDown(false);
  };

  const handleResendCode = () => {
    setShowCountDown(true);
    resendVerificationCodeEmail({ email, emailType });
  };

  const theme = colors();

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).root}>
        <LottieViewComponent animation={lotties.verificationCode} size={100} />
        <Subtitle align="center">{title}</Subtitle>
        <Regular style={{ marginTop: dimens.small }} align="center">
          Um código de verificação foi enviado para seu email.
        </Regular>
        <Card style={{ padding: dimens.small, marginTop: dimens.small }}>
          <Body style={{ marginBottom: dimens.small }} align="center">
            Digite o código aqui
          </Body>
          <CodeField
            ref={ref}
            caretHidden={false}
            value={value}
            onChangeText={setValue}
            textInputStyle={styles(theme).textInputStyle}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Regular
                key={index}
                align="center"
                style={[
                  styles(theme).cell,
                  isFocused && styles(theme).focusCell,
                ]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Regular>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: dimens.small,
            }}>
            <TouchableOpacity
              disabled={showCountDown}
              style={{ marginRight: dimens.tiny }}
              onPress={handleResendCode}>
              <Caption
                align="center"
                color={showCountDown ? "grey" : "primary"}>
                Reenviar código?
              </Caption>
            </TouchableOpacity>
            {showCountDown && (
              <CountDown initialValue={60} onFinish={handleFinishCountDown} />
            )}
          </View>
          <LottieViewComponent animation={lotties.emailPlane} size={70} />
          <View style={{ marginTop: dimens.base }}>
            <Caption align="center" color="secondary">
              Verifique sua caixa de spam ou promoções
            </Caption>
          </View>
        </Card>
        <CustomButton
          title="Verificar"
          onPress={handlePress}
          loading={isLoading}
          styleButton={{ marginTop: dimens.small }}
        />
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default VerificationCode;
