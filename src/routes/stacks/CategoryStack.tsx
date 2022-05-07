import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Category from "@app/features/Category/view/List";
import CreateCategory from "@app/features/Category/view/Create";
import EditCategory from "@app/features/Category/view/Edit";
import CategorySugestion from "@app/features/Category/view/CategorySugestion";

const Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListCategory"
        component={Category}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditCategory"
        component={EditCategory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateCategory"
        component={CreateCategory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CategorySugestion"
        component={CategorySugestion}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;
