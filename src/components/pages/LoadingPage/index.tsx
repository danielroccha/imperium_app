import React from "react";
import { View } from "react-native";

import LottieViewComponent from "@app/components/molecules/LottieViewComponent";

import { colors } from "@app/configs/Theme";
import { lotties } from "@app/assets";
import styles from "./styles";

const LoadingPage = () => {
  const theme = colors();

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).viewLoading}>
        <LottieViewComponent animation={lotties.loading} size={50} />
      </View>
    </View>
  );
};

export default LoadingPage;
