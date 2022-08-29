import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  updateProfileUseCase,
  TUpdateProfileViewModel,
} from "@app/features/Profile/domain/useCases/UpdateProfileUseCase";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

import RootStackNavigation from "@app/types/RootStackParams";
import handleApplicationError from "@app/handles/apiError";

const useUpdateCurrencyViewModel = (repository: IProfileRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const updateCurrency = useCallback(
    async (data: TUpdateProfileViewModel, callback?: () => void) => {
      try {
        setLoading(true);
        await updateProfileUseCase(
          { updateProfile: repository.updateProfile },
          data,
        );
        if (callback) {
          callback();
        } else {
          navigation.goBack();
        }
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.updateProfile],
  );

  return { updateCurrency, isLoading };
};

export { useUpdateCurrencyViewModel };
