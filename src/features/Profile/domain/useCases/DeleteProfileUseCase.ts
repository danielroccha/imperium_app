import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

const deleteProfileUseCase = async (
  repository: Pick<IProfileRepository, "deleteProfile">,
) => {
  await repository.deleteProfile();
};

export { deleteProfileUseCase };
