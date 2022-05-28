import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
          <Regular align="center">Entenda como funciona o seu saldo:</Regular>

          <Card style={styles(theme).card}>
            <Regular align="center">Balanço do mês:</Regular>
            <Regular style={styles(theme).marginContent} align="center">
              É a subtração de{" "}
              <Regular weight="semibold" color="primary">
                (receitas - despesas)
              </Regular>{" "}
              de meses passados. Por exemplo, se am abril de 2022 você teve um
              total em{" "}
              <Regular weight="semibold" color="green">
                {" "}
                receitas de {Util.formatToMoney(1425)}{" "}
              </Regular>{" "}
              e{" "}
              <Regular weight="semibold" color="danger">
                {Util.formatToMoney(700)} de despesas,
              </Regular>{" "}
              seu balanço do mês será de {Util.formatToMoney(725)}.
            </Regular>
            <Image
              source={images.balanceTutorial}
              style={styles(theme).image}
            />
          </Card>

          <Card style={{ padding: dimens.small, marginVertical: dimens.base }}>
            <Regular align="center">Saldo atual: (Acumulativo)</Regular>

            <Regular style={styles(theme).marginContent} align="center">
              É a soma do ultimo saldo do mês passado{" "}
              <Regular weight="semibold" color="green">
                {" "}
                {Util.formatToMoney(725)}{" "}
              </Regular>{" "}
              mais{" "}
              <Regular weight="semibold" color="primary">
                (receitas - despesas)
              </Regular>{" "}
              <Regular weight="semibold" color="green">
                {" "}
                receitas de {Util.formatToMoney(1000)}{" "}
              </Regular>{" "}
              e{" "}
              <Regular weight="semibold" color="danger">
                {Util.formatToMoney(72.75)} de despesas
              </Regular>{" "}
              seu balanço do mês será de {Util.formatToMoney(1652.25)}.
            </Regular>
            <Image
              source={images.currentTutorial}
              style={styles(theme).image}
            />
          </Card>

          <Card style={{ padding: dimens.small, marginVertical: dimens.base }}>
            <Regular align="center">Saldo previsto:</Regular>
            <Regular style={styles(theme).marginContent} align="center">
              É a subtração de{" "}
              <Regular weight="semibold" color="primary">
                (receitas - despesas)
              </Regular>{" "}
              . Por exemplo, se em Junho de 2022 você tem a previsão de um total
              em{" "}
              <Regular weight="semibold" color="green">
                {" "}
                receitas de {Util.formatToMoney(200)}{" "}
              </Regular>{" "}
              e{" "}
              <Regular weight="semibold" color="danger">
                {Util.formatToMoney(7.42)} de despesas,
              </Regular>{" "}
              seu saldo previsto será de {Util.formatToMoney(192.58)}.
            </Regular>
            <Image source={images.nextTutorial} style={styles(theme).image} />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default BalanceInfo;
