import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListRecurrence from "@app/features/Recurrence/view/List";
import CreateRecurrence from "@app/features/Recurrence/view/Create";
import EditRecurrence from "@app/features/Recurrence/view/Edit";
import SelectCategory from "@app/features/Category/view/SelectCategory";

const Stack = createNativeStackNavigator();

const RecurrenceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListRecurrence"
        component={ListRecurrence}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateRecurrence"
        component={CreateRecurrence}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditRecurrence"
        component={EditRecurrence}
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

export default RecurrenceStack;
