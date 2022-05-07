import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryStack from "@app/routes/stacks/CategoryStack";

import Home from "@app/features/Home/view";
import CreateTransaction from "@app/features/Transaction/view/Create";
import SelectCategory from "@app/features/Category/view/SelectCategory";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "card",
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CategoryStack"
        component={CategoryStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="CreateTransaction"
        component={CreateTransaction}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
        }}
        name="SelectCategory"
        component={SelectCategory}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
