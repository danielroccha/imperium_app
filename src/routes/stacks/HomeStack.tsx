import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@app/features/Home/view";
import CategoryStack from "@app/routes/stacks/CategoryStack";

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
    </Stack.Navigator>
  );
};

export default HomeStack;
