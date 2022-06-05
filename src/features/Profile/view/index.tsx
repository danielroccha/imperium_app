import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import Loading from "@app/components/molecules/Loading";
import { Caption, HeadLine, Regular } from "@app/components/atoms/Text";
import NavBar from "@app/components/organisms/Navbar";
import Card from "@app/components/atoms/Card";
import { logOut } from "@app/features/Login/data/loginActions";
import useProfileRepository from "@app/features/Profile/data/profileRepository";
import { useProfileViewModel } from "@app/features/Profile/view/profileViewModel";

import { colors, dimens } from "@app/configs/Theme";
import userService from "@app/services/user";
import { images } from "@app/assets";
import Util from "@app/util";

const Profile = () => {
  const navigation = useNavigation();
  const theme = colors();

  const profileRepository = useProfileRepository(userService);

  const { profile, loading } = useProfileViewModel(profileRepository);

  const handleLogout = () => {
    logOut();
  };

  const handlePressClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar iconRight="x" onClickActionRight={handlePressClose} />
      {loading ? (
        <Loading />
      ) : (
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
                <HeadLine color="white">
                  {profile?.name && Util.getInitialLetters(profile.name)}
                </HeadLine>
              </View>
              <Regular align="center">{profile?.name}</Regular>
              <Caption align="center">{profile?.email}</Caption>
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
      )}
    </View>
  );
};

export default Profile;
