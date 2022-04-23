import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@app/features/Home/view";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
