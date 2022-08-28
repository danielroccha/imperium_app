let ENV: "PRODUCTION" | "STAGING" | "DEBUG" = "PRODUCTION";

if (__DEV__ === true) {
  ENV = "DEBUG";
}
console.log("ENV", __DEV__);
const enviroment = {
  PRODUCTION: {
    api: "https://api-imperium.imperiumwallet.com/api",
  },
  STAGING: {
    api: "https://api-imperium-staging.imperiumwallet.com/api",
  },
  DEBUG: {
    api: "http://192.168.0.6:3333/api",
  },
};

ENV = "PRODUCTION";

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
