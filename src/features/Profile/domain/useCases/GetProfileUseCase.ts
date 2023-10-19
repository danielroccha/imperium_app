import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import IProfileEntity from "@app/features/Profile/data/IProfileEntity";
import IProfileModel from "@app/features/Profile/domain/models/IProfileModel";
import { dispatchStore } from "@app/configs/store";
import {
  setLoadingProfileAction,
  setProfileAction,
} from "@app/features/Profile/data/profileActions";
import storage, { KEYS } from "@app/configs/storage";
import crashlyticsProvider from "@app/providers/crashlytics";

const getProfileUseCase = async (
  repository: Pick<IProfileRepository, "getProfile">,
) => {
  dispatchStore(setLoadingProfileAction(true));
  const profile = await repository.getProfile();
  const profileDomain = mapProfileToDomain(profile);
  if (profile.currency) storage.save(KEYS.CURRENCY, profile.currency);
  crashlyticsProvider.setAttributesFromUser(profile);
  dispatchStore(setProfileAction(profileDomain));
  dispatchStore(setLoadingProfileAction(false));
};

const mapProfileToDomain = (profile: IProfileEntity): IProfileModel => ({
  email: profile.email,
  id: profile.id,
  name: profile.name,
  isFirstLogin: profile.isFirstLogin,
  currency: profile.currency,
});

export { getProfileUseCase };
