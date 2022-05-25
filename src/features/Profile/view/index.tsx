import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Caption, HeadLine, Regular } from "@app/components/atoms/Text";
import NavBar from "@app/components/organisms/Navbar";
import { colors, dimens } from "@app/configs/Theme";
import Card from "@app/components/atoms/Card";
import { images } from "@app/assets";
import { logOut } from "@app/features/Login/data/loginActions";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const theme = colors();

  const handleLogout = () => {
    logOut();
  };

  const handlePressClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar iconRight="x" onClickActionRight={handlePressClose} />
      <ScrollView contentContainerStyle={{ padding: dimens.small }}>
        <View>
          <View style={{ justifyContent: "space-evenly", height: 200 }}>
            <Image
              source={images.brandCrown}
              style={{ height: 50, width: 130, alignSelf: "center" }}
              resizeMode="cover"
            />
            <View
              style={{
                width: 85,
                height: 85,
                backgroundColor: theme.primary,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}>
              <HeadLine color="white">DR</HeadLine>
            </View>
            <Regular align="center">Daniel Rocha</Regular>
            <Caption align="center">danirocha.ti@gmail.com</Caption>
          </View>
          <Card style={{ marginTop: dimens.xlarge, padding: dimens.small }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={handleLogout}>
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Icon name="log-out" size={20} color={theme.primary} />
                  <Caption style={{ marginLeft: dimens.small }}>Sair</Caption>
                </View>
                <Icon name="chevron-right" size={18} color={theme.primary} />
              </>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
