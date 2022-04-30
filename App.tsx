import React, { useRef, useState } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { NotifierWrapper, Notifier, Easing } from "react-native-notifier";

import Routes from "@app/routes";
import { store } from "@app/configs/store";
import { colors } from "@app/configs/Theme";
import { Axios } from "@app/configs/api";

Axios.interceptors.request();
Axios.interceptors.response();

const App = () => {
  const theme = colors();
  const isDarkMode = useColorScheme() === "dark";
  const routeNameRef = useRef<string | undefined>();
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("");

  const handleStateChange = () => {
    // const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;
    if (currentRouteName) {
      setCurrentRoute(currentRouteName);
    }
    // if (previousRouteName !== currentRouteName) {
    //   Analitycs.logScreen(currentRouteName, currentRouteName);
    // }
    routeNameRef.current = currentRouteName;
  };

  return (
    <NotifierWrapper>
      <Provider store={store}>
        <SafeAreaView
          style={{
            backgroundColor: theme.mode,
            flex: 1,
          }}>
          <StatusBar barStyle={"dark-content"} />
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
