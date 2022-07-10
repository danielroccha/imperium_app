import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@app/features/Login/view";
import CreateAccount from "@app/features/CreateAccount/view";
import ForgotPassword from "@app/features/ForgotPassword/view";
import VerificationCode from "@app/features/VerificationCode/view";
import ChangePassword from "@app/features/ChangePassword/view";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
