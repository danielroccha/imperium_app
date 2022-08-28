import React from "react";
import { View } from "react-native";

import I18n from "@app/languages/I18n";

import { lotties } from "@app/assets";
import { Body, Title } from "@app/components/atoms/Text";
import LottieViewComponent from "@app/components/molecules/LottieViewComponent";
import { colors } from "@app/configs/Theme";

const NoConnection = () => {
  const theme = colors();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.mode,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Title>{I18n.t("common.ooops")}</Title>
      <LottieViewComponent animation={lotties.noConnection} size={200} />
      <Body>{I18n.t("connection.no_connection")}</Body>
    </View>
  );
};

export default NoConnection;
