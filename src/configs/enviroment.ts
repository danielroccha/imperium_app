import { TestIds } from "react-native-google-mobile-ads";

let ENV: "PRODUCTION" | "STAGING" | "DEBUG" = "PRODUCTION";

if (__DEV__ === true) {
  ENV = "DEBUG";
} else {
  ENV = "PRODUCTION";
}

const enviroment = {
  PRODUCTION: {
    api: "https://api.imperiumwallet.com/api",
    iOSAdUnitId: "ca-app-pub-8980799214004464~1263812953",
    iOSAdBanner: "ca-app-pub-8980799214004464/7557796558",
    iOSIntersticial: "ca-app-pub-8980799214004464/3240073750",
    androidAdUnitId: "ca-app-pub-8980799214004464~8075837157",
    androidAdBanner: "ca-app-pub-8980799214004464/4123331460",
    androidIntersticial: "ca-app-pub-8980799214004464/4010229949",
  },
  STAGING: {
    api: "https://api-staging.imperiumwallet.com/api",
    iOSAdUnitId: "",
    iOSAdBanner: TestIds.BANNER,
    iOSIntersticial: TestIds.INTERSTITIAL,
    androidAdUnitId: TestIds.APP_OPEN,
    androidAdBanner: TestIds.BANNER,
    androidIntersticial: TestIds.INTERSTITIAL,
  },
  DEBUG: {
    api: "http://192.168.0.19:3333/api",
    iOSAdUnitId: "",
    iOSAdBanner: TestIds.BANNER,
    iOSIntersticial: TestIds.INTERSTITIAL,
    androidAdUnitId: TestIds.APP_OPEN,
    androidAdBanner: TestIds.BANNER,
    androidIntersticial: TestIds.INTERSTITIAL,
  },
};

// ENV = "STAGING";

export default () => {
  switch (ENV) {
    case "PRODUCTION":
      return enviroment.PRODUCTION;
    case "STAGING":
      return enviroment.STAGING;
    default:
      return enviroment.DEBUG;
  }
};
