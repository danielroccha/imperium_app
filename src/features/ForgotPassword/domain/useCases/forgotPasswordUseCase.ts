import { TForgotPasswordViewModel } from "@app/features/ForgotPassword/view/forgotPasswordViewModel";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

const forgotPasswordUseCase = async (
  repository: Pick<IProfileRepository, "forgotPassword">,
  data: TForgotPasswordViewModel,
) => {
  const { email } = data;

  await repository.forgotPassword({ email });
};

export { forgotPasswordUseCase };
