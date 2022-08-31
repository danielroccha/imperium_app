import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { OS } from "@app/constants";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

export type TUpdateProfileViewModel = {
  name?: string;

  lastname?: string;

  password?: string;

  email?: string;

  tokenDeviceId?: string;

  appVersion?: string;

  currency?: string;

  os?: OS;
};

const updateProfileUseCase = async (
  repository: Pick<IProfileRepository, "updateProfile">,
  data: TUpdateProfileViewModel,
) => {
  const os: OS = Platform.OS === "ios" ? "ios" : "android";

  await repository.updateProfile({
    currency: data.currency,
    appVersion: DeviceInfo.getVersion(),
    email: data.email,
    lastname: data.lastname,
    name: data.name,
    os,
    password: data.password,
    tokenDeviceId: data.tokenDeviceId,
  });
};

export { updateProfileUseCase };
