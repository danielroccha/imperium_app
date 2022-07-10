import { useCallback, useState } from "react";

import { changePasswordUseCase } from "@app/features/ChangePassword/domain/useCases/changePasswordUseCase";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import handleApplicationError from "@app/handles/apiError";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import showNotification from "@app/components/organisms/CustomNotification";

export type TChangePasswordViewModel = {
  password: string;
  verificationCode: number;
  email: string;
};

const useChangePasswordViewModel = (repository: IProfileRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const changePassword = useCallback(
    async (data: TChangePasswordViewModel) => {
      try {
        setLoading(true);
        await changePasswordUseCase(
          { changePassword: repository.changePassword },
          data,
        );
        navigation.goBack();
        navigation.goBack();
        showNotification(
          "Senha alterada com sucesso",
          "Você ja pode fazer login com sua nova senha",
          "success",
        );
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.changePassword],
  );

  return { changePassword, isLoading };
};

export { useChangePasswordViewModel };
