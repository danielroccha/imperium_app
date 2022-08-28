import React from "react";
import { View } from "react-native";

import LottieViewComponent from "@app/components/molecules/LottieViewComponent";

import { HeadLine } from "@app/components/atoms/Text";

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
      <LottieViewComponent animation={lottie} size={400} />
      <HeadLine align="center">{text}</HeadLine>
    </View>
  );
};

export default EmptyStateList;
