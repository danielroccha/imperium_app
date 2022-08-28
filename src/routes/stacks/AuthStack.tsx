import React, { useEffect } from "react";

import NetInfo from "@react-native-community/netinfo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@app/features/Login/view";
import CreateAccount from "@app/features/CreateAccount/view";
import ForgotPassword from "@app/features/ForgotPassword/view";
import VerificationCode from "@app/features/VerificationCode/view";
import ChangePassword from "@app/features/ChangePassword/view";
import showNotification, {
  hideNotification,
} from "@app/components/organisms/CustomNotification";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        showNotification(
          "Ops!!!",
          "Você está sem conexão com internet.",
          "warning",
          0,
        );
      } else {
        hideNotification();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateAccount"
        component={CreateAccount}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VerificationCode"
        component={VerificationCode}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
