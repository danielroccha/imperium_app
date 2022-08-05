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
  const [showDialog, setShowDialog] = useState(false);
  const [eraseText, setEraseText] = useState("");
  const navigation = useNavigation();
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
    if (eraseText === "APAGAR") {
      resetBalance();
      setShowDialog(false);
    }
  };
  const handleChangeValue = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEraseText(e.nativeEvent.text);
  };

  const profileOptions = [
    {
      name: "Resetar saldo",
      iconColor: theme.danger,
      icon: "refresh-cw",
      action: () => handleResetBalance(),
    },
    {
      name: "Sair",
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
              Você tem certeza que quer resetar seu saldo? Essa ação não poderá
              ser desfeita e você perderá todo o seus lançamentos e histórico
              financeiro.
            </Dialog.Description>
            <Dialog.Description>
              <Caption>
                Se deseja continuar digite
                <Caption color="danger"> APAGAR</Caption> no campo abaixo.
              </Caption>
            </Dialog.Description>
            <Dialog.Input onChange={handleChangeValue} />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button
              label="Delete"
              disabled={eraseText !== "APAGAR"}
              color={eraseText === "APAGAR" ? theme.danger : theme.grey}
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
