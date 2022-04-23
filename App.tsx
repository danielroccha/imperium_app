import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { useRef } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import Routes from "@app/routes";
import { Provider } from "react-redux";
import { store } from "./src/configs/store";
import { colors } from "@app/configs/Theme";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const routeNameRef = useRef<string | undefined>();
  const navigationRef = useNavigationContainerRef();

  const handleStateChange = () => {
    // const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    // if (previousRouteName !== currentRouteName) {
    //   Analitycs.logScreen(currentRouteName, currentRouteName);
    // }

    routeNameRef.current = currentRouteName;
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ backgroundColor: colors().mode, flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <NavigationContainer
          ref={navigationRef}
          onStateChange={handleStateChange}>
          <Routes />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
