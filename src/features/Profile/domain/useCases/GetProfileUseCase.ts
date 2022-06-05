import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import IProfileEntity from "@app/features/Profile/data/IProfileEntity";
import IProfileModel from "@app/features/Profile/domain/models/IProfileModel";
import { dispatchStore } from "@app/configs/store";
import {
  setLoadingProfileAction,
  setProfileAction,
} from "@app/features/Profile/data/profileActions";

const getProfileUseCase = async (
  repository: Pick<IProfileRepository, "getProfile">,
) => {
  dispatchStore(setLoadingProfileAction(true));
  const profile = await repository.getProfile();
  const profileDomain = mapProfileToDomain(profile);
  dispatchStore(setProfileAction(profileDomain));
  dispatchStore(setLoadingProfileAction(false));
};

const mapProfileToDomain = (profile: IProfileEntity): IProfileModel => ({
  email: profile.email,
  id: profile.id,
  name: profile.name,
});

export { getProfileUseCase };
