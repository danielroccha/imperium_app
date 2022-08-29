import React, { useRef, useState } from "react";
import { View, ScrollView } from "react-native";

import I18n from "@app/languages/I18n";

import CustomButton from "@app/components/atoms/Button";
import { BigTitle, Subtitle } from "@app/components/atoms/Text";
import LottieViewComponent from "@app/components/molecules/LottieViewComponent";

import { lotties } from "@app/assets";
import { colors, dimens, SCREEN_WIDTH } from "@app/configs/Theme";
import CurrencyList from "@app/features/CurrencyList/view";
import CategorySugestion from "@app/features/Category/view/CategorySugestion";
import ListRecurrence from "@app/features/Recurrence/view/List";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();
  const theme = colors();
  const scrollViewRef = useRef<ScrollView>(null);
  const [hasRecurrence, setHasRecurrence] = useState(false);

  const nextPageScrollView = (index: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      x: SCREEN_WIDTH * index,
      y: 0,
    });
  };

  const handleSkipStep = () => {
    navigation.goBack();
  };

  const handleRecurrencesChanges = (value: boolean) => {
    setHasRecurrence(value);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}>
        <View
          style={{
            width: SCREEN_WIDTH,
            flex: 1,
            justifyContent: "space-evenly",
            padding: dimens.small,
          }}>
          <BigTitle align="center">{I18n.t("common.welcome")}</BigTitle>
          <LottieViewComponent size={200} animation={lotties.welcome} />
          <Subtitle align="center">
            {I18n.t("common.welcome_description")}
          </Subtitle>
          <CustomButton
            title={I18n.t("buttons.next")}
            onPress={() => nextPageScrollView(1)}
          />
        </View>
        <View style={{ width: SCREEN_WIDTH }}>
          <CurrencyList
            showNavBar={false}
            onSelectItem={() => nextPageScrollView(2)}
          />
        </View>
        <View style={{ width: SCREEN_WIDTH }}>
          <CategorySugestion
            showNavBar={false}
            onSave={() => nextPageScrollView(3)}
          />
        </View>
        <View style={{ width: SCREEN_WIDTH, backgroundColor: theme.mode }}>
          <ListRecurrence
            backAction={false}
            onListChange={handleRecurrencesChanges}
          />
          <View style={{ marginBottom: dimens.base, padding: dimens.small }}>
            <CustomButton
              title={
                hasRecurrence
                  ? I18n.t("buttons.lets_go")
                  : I18n.t("buttons.skip")
              }
              onPress={handleSkipStep}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnBoarding;
