import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "@app/features/Profile/view";
import CurrencyList from "@app/features/CurrencyList/view";
import Avatars from "@app/features/Avatars";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListRecurrence"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "card" }}
        name="CurrencyList"
        component={CurrencyList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Avatars"
        component={Avatars}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
