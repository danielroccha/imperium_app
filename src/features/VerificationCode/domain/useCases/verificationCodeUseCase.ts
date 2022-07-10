import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import { TVerificationViewModel } from "@app/features/VerificationCode/view/verificationCodeViewModel";

const verificationCodeUseCase = async (
  repository: Pick<IProfileRepository, "verificationCode">,
  data: TVerificationViewModel,
) => {
  const { code, email } = data;
  await repository.verificationCode({ code, email });
};

export { verificationCodeUseCase };
