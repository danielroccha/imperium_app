import React from "react";
import { View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeviceInfo from "react-native-device-info";
import I18n from "app/languages/I18n";

import Card from "@app/components/atoms/Card";

import { optionsEditProfile } from "app/configs/variables";

import { colors } from "@app/configs/Theme";
import { Regular, Small } from "@app/components/atoms/Text";
import styles from "./styles";

const CardOptionsProfile = () => {
  const theme = colors();
  return (
    <View style={styles(colors).container}>
      <Card style={styles(colors).card}>
        <View>
          {optionsEditProfile.map((item, index) => (
            <View key={item.name}>
              <TouchableOpacity
                style={styles(colors).touchable}
                onPress={item.action}>
                <View style={styles(colors).cellLeft}>
                  <View>
                    <Icon name={item.icon} size={22} color={colors.terciary} />
                  </View>
                  <View style={styles(colors).containerText}>
                    <Regular color="contrastMedium" weight="semibold">
                      {item.name}
                    </Regular>
                  </View>
                </View>
                <View>
                  <Icon
                    name="chevron-right"
                    size={24}
                    color={colors.contrastMedium}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Small color="grey" align="right">{`${I18n.t(
          "common.version",
        )}: ${DeviceInfo.getVersion()}`}</Small>
      </Card>
    </View>
  );
};

export default React.memo(CardOptionsProfile);
