import React from "react";
import { View } from "react-native";
import { colors } from "@app/configs/Theme";
import { lotties } from "@app/assets";
import LottieView from "lottie-react-native";
import styles from "./styles";

const Loading = () => {
  const theme = colors();
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).viewLoading}>
        <LottieView source={lotties.loading} autoPlay />
      </View>
    </View>
  );
};

export default Loading;
