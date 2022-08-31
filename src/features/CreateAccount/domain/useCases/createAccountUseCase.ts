import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ICreateAccountRepository } from "@app/features/CreateAccount/data/createAccountRepository";
import { TCreateAccountViewModel } from "@app/features/CreateAccount/view/createAccountViewModel";

import { OS } from "@app/constants";

const createAccountUseCase = async (
  repository: Pick<ICreateAccountRepository, "createAccount">,
  data: TCreateAccountViewModel,
) => {
  const { email, password, name } = data;

  const names = name.split(" ").filter(i => i !== "");
  const [firstname] = names;

  const platform: OS = Platform.OS === "ios" ? "ios" : "android";

  await repository.createAccount({
    email,
    password,
    lastname: names[names.length - 1],
    name: firstname,
    os: platform,
    appVersion: DeviceInfo.getVersion(),
    tokenDeviceId: "",
  });
};

export { createAccountUseCase };
