import React from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";

import { Caption } from "@app/components/atoms/Text";

type EmptyStateListProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lottie: any;
  text: string;
};

const EmptyStateList = ({ lottie, text }: EmptyStateListProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
      <LottieView source={lottie} style={{ height: 200 }} autoPlay />
      <Caption style={{ width: 200 }} align="center">
        {text}
      </Caption>
    </View>
  );
};

export default EmptyStateList;
