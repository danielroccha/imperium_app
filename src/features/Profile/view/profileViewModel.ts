import { useCallback } from "react";
import { useSelector } from "react-redux";

import { handleError } from "@app/configs/api";
import { getProfileUseCase } from "@app/features/Profile/domain/useCases/GetProfileUseCase";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import { RootState } from "@app/configs/store";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useProfileViewModel = (repository: IProfileRepository) => {
  const { loading, profile } = useSelector((state: RootState) => state.profile);

  const getData = useCallback(async () => {
    try {
      await getProfileUseCase({
        getProfile: repository.getProfile,
      });
    } catch (error) {
      handleError(error);
    }
  }, [repository.getProfile]);

  return { getData, loading, profile };
};

export { useProfileViewModel };
