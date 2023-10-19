import "intl";
import "intl/locale-data/jsonp/en";
import React, { useRef, useState } from "react";
import { SafeAreaView, StatusBar, LogBox, View } from "react-native";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Routes from "@app/routes";
import { store } from "@app/configs/store";
import { colors } from "@app/configs/Theme";
import { Axios } from "@app/configs/api";
import analyticsProvider from "@app/providers/analytics";
import useAds from "@app/hooks/useAds";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Axios.interceptors.request();
Axios.interceptors.response();

const App = () => {
  const theme = colors();
  const routeNameRef = useRef<string | undefined>();
  const navigationRef = useNavigationContainerRef();
  const [currentScreen, setCurrentScreen] = useState("");
  const { BannerAd } = useAds();

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      setCurrentScreen(currentRouteName);
      analyticsProvider.logScreenView(currentRouteName);
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper>
        <Provider store={store}>
          <SafeAreaView
            style={{
              backgroundColor: theme.mode,
              flex: 1,
            }}>
            <StatusBar
              backgroundColor={theme.white}
              barStyle={"dark-content"}
            />
            <NavigationContainer
              ref={navigationRef}
              onStateChange={handleStateChange}>
              <Routes />
            </NavigationContainer>
            {currentScreen !== "Login" &&
              currentScreen !== "CreateAccount" &&
              currentScreen !== "ForgotPassword" &&
              currentScreen !== "VerificationCode" &&
              currentScreen !== "ChangePassword" && (
                <View style={{ alignItems: "center" }}>
                  <BannerAd />
                </View>
              )}
          </SafeAreaView>
        </Provider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
};

export default App;
