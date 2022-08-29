import { useCallback } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

import I18n from "@app/languages/I18n";

import handleApplicationError from "@app/handles/apiError";
import { getProfileUseCase } from "@app/features/Profile/domain/useCases/GetProfileUseCase";
import { resetBalanceUseCase } from "@app/features/Profile/domain/useCases/ResetBalanceUseCase";
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
      handleApplicationError.handleError(error);
    }
  }, [repository.getProfile]);

  const resetBalance = useCallback(async () => {
    try {
      await resetBalanceUseCase({
        resetBalance: repository.resetBalance,
      });
      Alert.alert(
        I18n.t("alerts.reset_title"),
        I18n.t("alerts.reset_description"),
        [{ text: I18n.t("buttons.ok") }],
      );
    } catch (error) {
      handleApplicationError.handleError(error);
    }
  }, [repository.resetBalance]);

  return { getData, resetBalance, loading, profile };
};

export { useProfileViewModel };
