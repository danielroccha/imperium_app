import React, { useEffect, useRef } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import AnimatedLottieView from "lottie-react-native";

import { colors } from "@app/configs/Theme";
import styles from "./styles";

type LottieViewComponentProps = {
  animation: any;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

const LottieViewComponent = ({
  animation,
  style,
  size,
}: LottieViewComponentProps) => {
  const lottieRef = useRef<AnimatedLottieView>(null);

  useEffect(() => {
    setTimeout(() => lottieRef.current?.play(), 100);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View style={[styles().viewLottie, { width: size, height: size }]}>
        <AnimatedLottieView
          ref={lottieRef}
          style={style}
          source={animation}
          autoPlay
        />
      </View>
    </View>
  );
};

export default LottieViewComponent;
