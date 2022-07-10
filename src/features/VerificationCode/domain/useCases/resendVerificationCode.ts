import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import { TResendVerificationEmailViewModel } from "@app/features/VerificationCode/view/verificationCodeViewModel";

const resendVerificationCodeUseCase = async (
  repository: Pick<IProfileRepository, "resendVerificationCode">,
  data: TResendVerificationEmailViewModel,
) => {
  const { emailType, email } = data;
  await repository.resendVerificationCode({ email, emailType });
};

export { resendVerificationCodeUseCase };
