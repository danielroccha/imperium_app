import React, { useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Dialog from "react-native-dialog";
import DeviceInfo from "react-native-device-info";
import I18n from "@app/languages/I18n";

import Loading from "@app/components/molecules/Loading";
import { Caption, HeadLine, Regular, Small } from "@app/components/atoms/Text";
import NavBar from "@app/components/organisms/Navbar";
import Card from "@app/components/atoms/Card";
import { logOut } from "@app/features/Login/data/loginActions";
import useProfileRepository from "@app/features/Profile/data/profileRepository";
import { useProfileViewModel } from "@app/features/Profile/view/profileViewModel";

import { colors, dimens } from "@app/configs/Theme";
import userService from "@app/services/user";
import { images } from "@app/assets";
import Util from "@app/util";
import RootStackNavigation from "@app/types/RootStackParams";

const Profile = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [eraseText, setEraseText] = useState("");
  const navigation = useNavigation<RootStackNavigation>();
  const theme = colors();

  const profileRepository = useProfileRepository(userService);

  const { profile, loading, resetBalance } =
    useProfileViewModel(profileRepository);

  const handleLogout = () => {
    logOut();
  };

  const handlePressClose = () => {
    navigation.goBack();
  };

  const handleResetBalance = () => {
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEraseText("");
  };

  const handleDelete = () => {
    if (eraseText === I18n.t("buttons.erase")) {
      resetBalance();
      setShowDialog(false);
    }
  };

  const handleChangeValue = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEraseText(e.nativeEvent.text);
  };

  const handleNavigation = () => {
    navigation.navigate("CurrencyList");
  };

  const profileOptions = [
    {
      name: I18n.t("profile.reset_data"),
      iconColor: theme.danger,
      icon: "refresh-cw",
      action: () => handleResetBalance(),
    },
    {
      name: I18n.t("profile.change_currency"),
      iconColor: theme.primary,
      icon: "dollar-sign",
      action: () => handleNavigation(),
    },
    {
      name: I18n.t("profile.logout"),
      iconColor: theme.primary,
      icon: "log-out",
      action: () => handleLogout(),
    },
  ];

  return (
    <View style={{ backgroundColor: theme.mode, flex: 1 }}>
      <NavBar iconRight="x" onClickActionRight={handlePressClose} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ padding: dimens.small }}>
          <Dialog.Container visible={showDialog} onBackdropPress={handleCancel}>
            <Dialog.Title>Resetar saldo</Dialog.Title>
            <Dialog.Description>
              {I18n.t("profile.dialog_description")}
            </Dialog.Description>
            <Dialog.Description>
              <Caption color="contrast">
                Se deseja continuar digite
                <Caption color="danger"> {I18n.t("buttons.erase")}</Caption> no
                campo abaixo.
              </Caption>
            </Dialog.Description>
            <Dialog.Input
              autoCorrect={false}
              spellCheck={false}
              onChange={handleChangeValue}
            />
            <Dialog.Button
              label={I18n.t("buttons.cancel")}
              onPress={handleCancel}
            />
            <Dialog.Button
              label={I18n.t("buttons.remove")}
              disabled={eraseText !== I18n.t("buttons.erase")}
              color={
                eraseText === I18n.t("buttons.erase")
                  ? theme.danger
                  : theme.grey
              }
              onPress={handleDelete}
            />
          </Dialog.Container>
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
            <Card
              style={{
                marginTop: dimens.xlarge,
                paddingHorizontal: dimens.small,
              }}>
              {profileOptions.map(option => (
                <TouchableOpacity
                  key={option.icon}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: dimens.small,
                  }}
                  onPress={option.action}>
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Icon
                        name={option.icon}
                        size={20}
                        color={option.iconColor}
                      />
                      <Caption style={{ marginLeft: dimens.small }}>
                        {option.name}
                      </Caption>
                    </View>
                    <Icon
                      name="chevron-right"
                      size={18}
                      color={theme.primary}
                    />
                  </>
                </TouchableOpacity>
              ))}
            </Card>
            <Small align="right" color="grey">
              {`${I18n.t(
                "profile.version",
              )}: ${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`}
            </Small>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
