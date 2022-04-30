import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { images } from "@app/assets";
import { Regular } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";

import styles from "./styles";

type NavBarProps = {
  iconRight?: string;
  iconLeft?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageCentral?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageProfile?: any;
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
}: NavBarProps) => {
  const theme = colors();

  const handleClickRightAction = () => {
    if (onClickActionRight) {
      onClickActionRight();
    } else {
      //open profile
    }
  };

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity style={{ width: 40 }} onPress={onClickActionLeft}>
        {iconLeft && <Icon name={iconLeft} size={22} color={theme.primary} />}
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
      <TouchableOpacity
        style={{ width: 40, height: 40 }}
        onPress={handleClickRightAction}>
        {iconRight ? (
          <Icon name={iconRight} size={22} color={theme.primary} />
        ) : (
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/24/b1/12/24b112b8c112d1077981c9ebc0780014.jpg",
            }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
