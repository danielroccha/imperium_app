import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@app/features/Login/view";
import CreateAccount from "@app/features/CreateAccount/view";

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
    </Stack.Navigator>
  );
};

export default AuthStack;
