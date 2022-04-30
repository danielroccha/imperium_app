import { OS } from "@app/constants";
import { ICreateAccountRepository } from "@app/features/CreateAccount/data/createAccountRepository";
import { TCreateAccountViewModel } from "@app/features/CreateAccount/view/createAccountViewModel";
import { Platform } from "react-native";

const createAccountUseCase = async (
  repository: Pick<ICreateAccountRepository, "createAccount">,
  data: TCreateAccountViewModel,
) => {
  const { email, password, name } = data;

  const [firstName, lastname] = name.split(" ");

  const platform: OS = Platform.OS === "ios" ? "ios" : "android";

  await repository.createAccount({
    email,
    password,
    lastname,
    name: firstName,
    os: platform,
    appVersion: "1.0",
    tokenDeviceId: "",
  });
};

export { createAccountUseCase };