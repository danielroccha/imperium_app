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
  await repository.updateProfile({ currency: data.currency });
};

export { updateProfileUseCase };
