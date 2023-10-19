import React, { useEffect, useMemo } from "react";

import NetInfo from "@react-native-community/netinfo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryStack from "@app/routes/stacks/CategoryStack";
import RecurrenceStack from "@app/routes/stacks/RecurrenceStack";
import ProfileStack from "@app/routes/stacks/ProfileStack";
import OnboardingStack from "@app/routes/stacks/OnboardingStack";
import DeprecatedVersion from "@app/components/pages/DeprecatedVersion";

import Home from "@app/features/Home/view";
import NoConnection from "@app/components/pages/NoConnection";
import CreateTransaction from "@app/features/Transaction/view/Create";
import EditTransaction from "@app/features/Transaction/view/Edit";
import TransactionGroupByCategory from "@app/features/Transaction/view/TransactionGroupByCategory";
import CreateCategory from "@app/features/Category/view/Create";
import EditRecurrence from "@app/features/Recurrence/view/Edit";

import BalanceInfo from "@app/components/pages/BalanceInfo";

import SelectCategory from "@app/features/Category/view/SelectCategory";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        navigation.navigate("NoConnection");
      } else {
        navigation.goBack();
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <>
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
          name="EditRecurrence"
          component={EditRecurrence}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "modal",
          }}
          name="ProfileStack"
          component={ProfileStack}
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
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
          }}
          name="NoConnection"
          component={NoConnection}
        />
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerShown: false,
            presentation: "modal",
          }}
          name="OnboardingStack"
          component={OnboardingStack}
        />
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerShown: false,
            presentation: "modal",
          }}
          name="DeprecatedVersion"
          component={DeprecatedVersion}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
