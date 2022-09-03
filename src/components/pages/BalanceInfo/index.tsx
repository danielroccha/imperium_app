import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import I18n from "@app/languages/I18n";

import NavBar from "@app/components/organisms/Navbar";
import { colors, dimens } from "@app/configs/Theme";
import { Regular } from "@app/components/atoms/Text";
import Card from "@app/components/atoms/Card";
import { images } from "@app/assets";
import styles from "./styles";
import Util from "@app/util";

const BalanceInfo = () => {
  const theme = colors();
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar iconRight="x" onClickActionRight={handleClose} />
      <ScrollView contentContainerStyle={{ backgroundColor: theme.mode }}>
        <View
          style={{
            padding: dimens.small,
          }}>
          <Regular align="center">{I18n.t("balance_info.title")}</Regular>

          <Card style={styles(theme).card}>
            <Regular align="center">
              {I18n.t("balance_info.previous_month_title")}
            </Regular>
            <Regular style={styles(theme).marginContent} align="center">
              {I18n.t("balance_info.previous_month", {
                income: Util.formatToMoney(1425),
                expense: Util.formatToMoney(700),
                currentBalance: Util.formatToMoney(725),
              })}
            </Regular>
            <Image
              source={images.balanceTutorial}
              style={styles(theme).image}
            />
          </Card>

          <Card style={{ padding: dimens.small, marginVertical: dimens.base }}>
            <Regular align="center">
              {I18n.t("balance_info.current_month_title")}
            </Regular>

            <Regular style={styles(theme).marginContent} align="center">
              {I18n.t("balance_info.current_month", {
                lastBalance: Util.formatToMoney(725),
                income: Util.formatToMoney(1425),
                expense: Util.formatToMoney(700),
                currentBalance: Util.formatToMoney(1652.25),
              })}
            </Regular>
            <Image
              source={images.currentTutorial}
              style={styles(theme).image}
            />
          </Card>

          <Card style={{ padding: dimens.small, marginVertical: dimens.base }}>
            <Regular align="center">
              {I18n.t("balance_info.next_month_title")}
            </Regular>
            <Regular style={styles(theme).marginContent} align="center">
              {I18n.t("balance_info.next_month", {
                income: Util.formatToMoney(200),
                expense: Util.formatToMoney(7.42),
                currentBalance: Util.formatToMoney(192.58),
              })}
            </Regular>
            <Image source={images.nextTutorial} style={styles(theme).image} />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default BalanceInfo;
