import Util from "@app/util";
import analytics from "@react-native-firebase/analytics";

interface IAnalytics {
  logScreenView: (currentRouteName: string | undefined) => Promise<void>;
}

const logScreenView = async (currentRouteName: string | undefined) => {
  const shouldTrackUser = await Util.shouldTrackUser();
  if (shouldTrackUser) {
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    });
  }
};

const analyticsProvider: IAnalytics = {
  logScreenView,
};

export default analyticsProvider;
