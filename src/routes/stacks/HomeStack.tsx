import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryStack from "@app/routes/stacks/CategoryStack";
import RecurrenceStack from "@app/routes/stacks/RecurrenceStack";

import Home from "@app/features/Home/view";
import CreateTransaction from "@app/features/Transaction/view/Create";
import EditTransaction from "@app/features/Transaction/view/Edit";
import TransactionGroupByCategory from "@app/features/Transaction/view/TransactionGroupByCategory";
import CreateCategory from "@app/features/Category/view/Create";

import Profile from "@app/features/Profile/view";

import BalanceInfo from "@app/components/pages/BalanceInfo";

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
        options={{ headerShown: false }}
        name="RecurrenceStack"
        component={RecurrenceStack}
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
          presentation: "modal",
        }}
        name="CreateCategory"
        component={CreateCategory}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="EditTransaction"
        component={EditTransaction}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="BalanceInfo"
        component={BalanceInfo}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
        }}
        name="SelectCategory"
        component={SelectCategory}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="TransactionGroupByCategory"
        component={TransactionGroupByCategory}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
