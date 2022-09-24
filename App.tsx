import "intl";
import "intl/locale-data/jsonp/en";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  LogBox,
  Platform,
  Appearance,
} from "react-native";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";

import Routes from "@app/routes";
import { store } from "@app/configs/store";
import { colors } from "@app/configs/Theme";
import { Axios } from "@app/configs/api";
import storage from "@app/configs/storage";
import analyticsProvider from "@app/providers/analytics";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Axios.interceptors.request();
Axios.interceptors.response();

const App = () => {
  const theme = colors();
  const isDarkMode = useColorScheme() === "dark";
  const routeNameRef = useRef<string | undefined>();
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("");
  const [barStyle, setBarStyle] = useState<
    "light-content" | "dark-content" | "default" | undefined
  >(Appearance.getColorScheme() === "dark" ? "dark-content" : "light-content");

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;
    if (currentRouteName) {
      setCurrentRoute(currentRouteName);
    }
    if (previousRouteName !== currentRouteName) {
      analyticsProvider.logScreenView(currentRouteName);
    }
    routeNameRef.current = currentRouteName;
  };

  const themeDark = useCallback(async () => {
    const value = await storage.getAppearance();
    if (value) {
      if (value === "dark") return setBarStyle("light-content");
      return setBarStyle("dark-content");
    }
    if (Appearance.getColorScheme() === "dark") setBarStyle("light-content");
    else setBarStyle("dark-content");
  }, []);

  useEffect(() => {
    // themeDark();
  });

  return (
    <NotifierWrapper>
      <Provider store={store}>
        <SafeAreaView
          style={{
            backgroundColor: theme.contrastMode,
            flex: 1,
          }}>
          <StatusBar
            barStyle={Platform.OS === "ios" ? "dark-content" : undefined}
          />
          <NavigationContainer
            ref={navigationRef}
            onStateChange={handleStateChange}>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </NotifierWrapper>
  );
};

export default App;
