import React from "react";
import { View, Linking } from "react-native";

import I18n from "@app/languages/I18n";

import LottieViewComponent from "@app/components/molecules/LottieViewComponent";
import { lotties } from "@app/assets";
import { colors, dimens } from "@app/configs/Theme";
import { Body, Regular, Title } from "@app/components/atoms/Text";
import CustomButton from "@app/components/atoms/Button";
import remoteConfigProvider from "@app/providers/remoteConfig";

const DeprecatedVersion = () => {
  const theme = colors();

  const updateVersion = async () => {
    const value = await remoteConfigProvider.getRemoteConfig("app_url_store");
    Linking.openURL(value);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.mode,
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: dimens.base,
      }}>
      <Title align="center">{I18n.t("deprecated_version.old_version")}</Title>
      <Regular align="center">
        {I18n.t("deprecated_version.update_to_new_features")}
      </Regular>
      <LottieViewComponent animation={lotties.warningVersion} size={250} />
      <Body align="center">
        {I18n.t("deprecated_version.click_the_button_below_to_update_your_app")}
      </Body>
      <CustomButton
        title={I18n.t("deprecated_version.update_version")}
        onPress={updateVersion}
      />
    </View>
  );
};

export default DeprecatedVersion;
