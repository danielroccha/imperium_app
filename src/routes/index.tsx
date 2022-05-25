import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "@app/routes/stacks/AuthStack";
import HomeStack from "@app/routes/stacks/HomeStack";

import { RootState } from "@app/configs/store";
import { changeAuthenticationFlow } from "@app/features/Login/data/loginActions";

import storage from "@app/configs/storage";
import LoadingPage from "@app/components/pages/LoadingPage";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        options={{ headerShown: false }}
        component={HomeStack}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const autheticationFlow = useSelector(
    ({ auth }: RootState) => auth.authenticationFlow,
  );

  const dispatch = useDispatch();

  const checkTokenExists = useCallback(async () => {
    const apiKey = await storage.getApiKey();
    if (apiKey) {
      setToken(apiKey);
      dispatch<any>(changeAuthenticationFlow("AUTHENTICATED"));
    } else {
      setToken(null);
      dispatch<any>(changeAuthenticationFlow("UNAUTHENTICATED"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (autheticationFlow) {
      setLoading(false);
    }
  }, [autheticationFlow]);

  useEffect(() => {
    checkTokenExists();
  }, [token, checkTokenExists, autheticationFlow]);

  if (loading) {
    return <LoadingPage />;
  }
  // storage.removeAllKeys();
  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen
            name="App"
            options={{ headerShown: false }}
            component={MainStack}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={AuthStack}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
