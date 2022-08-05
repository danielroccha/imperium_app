import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

const resetBalanceUseCase = async (
  repository: Pick<IProfileRepository, "resetBalance">,
) => {
  await repository.resetBalance();
};

export { resetBalanceUseCase };
