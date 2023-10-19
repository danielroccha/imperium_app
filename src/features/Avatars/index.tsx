import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { avatars } from "@app/assets";
import Card from "@app/components/atoms/Card";
import NavBar from "@app/components/organisms/Navbar";
import { colors, dimens } from "@app/configs/Theme";
import storage, { KEYS } from "@app/configs/storage";
import RootStackNavigation from "@app/types/RootStackParams";
import { useNavigation } from "@react-navigation/native";

const Avatars = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const theme = colors();

  const handleChooseAvatar = async (avatarImage: number) => {
    await storage.save(KEYS.AVATAR, avatarImage.toString());
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode }}>
      <NavBar backAction title="Avatars" />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: dimens.xtiny,
        }}>
        {avatars.map(avatarImage => (
          <Card style={{ margin: dimens.xtiny }} key={avatarImage}>
            <TouchableOpacity onPress={() => handleChooseAvatar(avatarImage)}>
              <Image source={avatarImage} style={{ width: 120, height: 120 }} />
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default Avatars;
