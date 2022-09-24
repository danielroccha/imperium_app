import remoteConfig from "@react-native-firebase/remote-config";

type IRemoteKeys = "deprecated_version" | "latest_version" | "app_url_store";
type IRemoteFlags = "deprecated_version" | "latest_version" | "app_url_store";

interface IRemoteConfig {
  getRemoteConfig: (flag: IRemoteKeys) => Promise<string>;
  getRemoteFlag: (flag: IRemoteFlags) => Promise<boolean>;
}

const getRemoteConfig = async (flag: IRemoteKeys): Promise<string> => {
  await remoteConfig().fetch(7200);
  await remoteConfig().fetchAndActivate();
  const remoteConfigValue = remoteConfig().getValue(flag).asString();
  return remoteConfigValue;
};

const getRemoteFlag = async (flag: IRemoteFlags): Promise<boolean> => {
  await remoteConfig().fetch(7200);
  await remoteConfig().fetchAndActivate();
  const remoteConfigValue = remoteConfig().getValue(flag).asBoolean();
  return remoteConfigValue;
};

const remoteConfigProvider: IRemoteConfig = {
  getRemoteConfig,
  getRemoteFlag,
};

export default remoteConfigProvider;
