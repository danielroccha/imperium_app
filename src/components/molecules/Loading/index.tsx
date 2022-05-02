import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";

import { colors } from "@app/configs/Theme";
import { lotties } from "@app/assets";
import styles from "./styles";

const Loading = () => {
  const lottieRef = useRef<LottieView>(null);
  const theme = colors();

  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles(theme).viewLoading}>
        <LottieView ref={lottieRef} source={lotties.loading} />
      </View>
    </View>
  );
};

export default Loading;
