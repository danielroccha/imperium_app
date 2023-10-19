import React, { useCallback, useEffect } from "react";
import { Platform } from "react-native";

import {
  AdEventType,
  BannerAd as Banner,
  BannerAdSize,
  InterstitialAd,
} from "react-native-google-mobile-ads";

import enviroment from "@app/configs/enviroment";

const useAds = () => {
  const { androidIntersticial, iOSAdBanner, androidAdBanner, iOSIntersticial } =
    enviroment();

  const interstitialAdUnitId =
    Platform.OS === "ios" ? iOSIntersticial : androidIntersticial;

  const bannerAdUnitId = Platform.OS === "ios" ? iOSAdBanner : androidAdBanner;

  const interstitialAd =
    InterstitialAd.createForAdRequest(interstitialAdUnitId);

  const BannerAd = () => (
    <Banner unitId={bannerAdUnitId} size={BannerAdSize.BANNER} />
  );

  const showAdd = (onClose: () => void) => {
    interstitialAd.show();
    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => onClose());
  };

  const preLoad = useCallback(() => {
    interstitialAd.load();
  }, [interstitialAd]);

  useEffect(() => {
    preLoad();
  }, [preLoad]);

  return { interstitialAd, BannerAd, showAdd };
};

export default useAds;
