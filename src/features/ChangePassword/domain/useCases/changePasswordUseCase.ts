import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import { TChangePasswordViewModel } from "@app/features/ChangePassword/view/changePasswordViewModel";

const changePasswordUseCase = async (
  repository: Pick<IProfileRepository, "changePassword">,
  data: TChangePasswordViewModel,
) => {
  const { email, password, verificationCode } = data;

  await repository.changePassword({ email, password, verificationCode });
};

export { changePasswordUseCase };
