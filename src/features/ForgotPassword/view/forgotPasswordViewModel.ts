import { useCallback, useState } from "react";

import { forgotPasswordUseCase } from "@app/features/ForgotPassword/domain/useCases/forgotPasswordUseCase";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import handleApplicationError from "@app/handles/apiError";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";

export type TForgotPasswordViewModel = {
  email: string;
};

const useForgotPasswordViewModel = (repository: IProfileRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const send = useCallback(
    async (data: TForgotPasswordViewModel) => {
      try {
        setLoading(true);
        await forgotPasswordUseCase(
          { forgotPassword: repository.forgotPassword },
          data,
        );
        navigation.replace("VerificationCode", {
          email: data.email,
          title: "Validação de e-mail",
          emailType: "FORGOT_PASSWORD",
          callback: () => {
            navigation.navigate("ChangePassword", {
              email: data.email,
            });
          },
        });
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.forgotPassword],
  );

  return { send, isLoading };
};

export { useForgotPasswordViewModel };
