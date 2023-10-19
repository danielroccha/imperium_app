import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { images } from "@app/assets";
import { Caption, Regular } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";

import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import Util from "@app/util";
import { useSelector } from "react-redux";
import { RootState } from "@app/configs/store";
import storage, { KEYS } from "@app/configs/storage";

type NavBarProps = {
  iconRight?: string;
  iconLeft?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageCentral?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backAction?: boolean;
  showAvatarProfile?: boolean;
  onClickActionRight?: () => void;
  onClickActionLeft?: () => void;
};

const NavBar = ({
  iconLeft,
  iconRight,
  imageCentral,
  onClickActionLeft,
  onClickActionRight,
  title,
  showAvatarProfile,
  backAction,
}: NavBarProps) => {
  const theme = colors();
  const [avatar, setAvatar] = useState("");

  const { profile } = useSelector((state: RootState) => state.profile);

  const navigation = useNavigation<RootStackNavigation>();

  const handleClickRightAction = () => {
    if (onClickActionRight) {
      onClickActionRight();
    } else {
      openProfile();
    }
  };

  const openProfile = () => {
    navigation.navigate("ProfileStack");
  };

  const handleClickLeftAction = () => {
    if (backAction) {
      navigation.goBack();
    } else {
      if (onClickActionLeft) onClickActionLeft();
    }
  };

  const checkAvatar = useCallback(async () => {
    const result = await storage.get(KEYS.AVATAR);
    if (result) {
      setAvatar(result);
    }
  }, []);

  const getIcon = () => {
    if (Platform.OS === "ios") {
      return "chevron-left";
    }
    return "arrow-left";
  };

  useFocusEffect(() => {
    checkAvatar();
  });

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity style={{ width: 40 }} onPress={handleClickLeftAction}>
        {iconLeft && <Icon name={iconLeft} size={25} color={theme.contrast} />}
        {backAction && (
          <Icon name={getIcon()} size={25} color={theme.contrast} />
        )}
      </TouchableOpacity>
      <View>
        {imageCentral ? (
          <Image
            source={images.brandCrown}
            style={{ height: 50, width: 100 }}
            resizeMode="cover"
          />
        ) : (
          <Regular>{title}</Regular>
        )}
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {iconRight && (
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleClickRightAction}>
            <Icon name={iconRight} size={25} color={theme.contrast} />
          </TouchableOpacity>
        )}
        {showAvatarProfile && (
          <TouchableOpacity onPress={handleClickRightAction}>
            {avatar ? (
              <Image
                source={avatar as ImageSourcePropType}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <View
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.primary,
                }}>
                <Caption color="white">
                  {profile && Util.getInitialLetters(profile?.name ?? "")}
                </Caption>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NavBar;
