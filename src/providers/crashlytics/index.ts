import crashlytics from "@react-native-firebase/crashlytics";

import IProfileEntity from "@app/features/Profile/data/IProfileEntity";
import Util from "@app/util";

interface ICrashlytics {
  setAttributesFromUser: (profileData: IProfileEntity) => void;
}

const setAttributesFromUser = async (profileData: IProfileEntity) => {
  const shouldTrackUser = await Util.shouldTrackUser();
  if (shouldTrackUser) {
    crashlytics().setAttributes({
      id: profileData.id,
      email: profileData.email,
      username: profileData.name,
    });
  }
};

const crashlyticsProvider: ICrashlytics = {
  setAttributesFromUser,
};

export default crashlyticsProvider;
