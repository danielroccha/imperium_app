let ENV: "PRODUCTION" | "STAGING" | "DEBUG" = "PRODUCTION";

if (__DEV__ === true) {
  ENV = "DEBUG";
} else {
  ENV = "PRODUCTION";
}

const enviroment = {
  PRODUCTION: {
    api: "https://api-imperium.imperiumwallet.com/api",
  },
  STAGING: {
    api: "https://api-imperium-staging.imperiumwallet.com/api",
  },
  DEBUG: {
    api: "http://192.168.0.8:3333/api",
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
