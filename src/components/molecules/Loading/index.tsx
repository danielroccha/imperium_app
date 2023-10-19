import React from "react";
import { View } from "react-native";

import LottieViewComponent from "@app/components/molecules/LottieViewComponent";

import { colors } from "@app/configs/Theme";
import { lotties } from "@app/assets";
import styles from "./styles";

const Loading = () => {
  const theme = colors();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View style={styles(theme).viewLoading}>
        <LottieViewComponent
          size={50}
          animation={lotties.loading}
          style={{ borderRadius: 100 }}
        />
      </View>
    </View>
  );
};

export default Loading;
