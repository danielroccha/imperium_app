import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoarding from "@app/features/OnBoarding/view";
import CreateRecurrence from "@app/features/Recurrence/view/Create";
import SelectCategory from "@app/features/Category/view/SelectCategory";
import CreateCategory from "@app/features/Category/view/Create";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          gestureEnabled: false,
        }}
        name="OnBoarding"
        component={OnBoarding}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateRecurrence"
        component={CreateRecurrence}
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
        name="CreateCategory"
        component={CreateCategory}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
