import { useCallback, useState } from "react";

import { verificationCodeUseCase } from "@app/features/VerificationCode/domain/useCases/verificationCodeUseCase";
import { resendVerificationCodeUseCase } from "@app/features/VerificationCode/domain/useCases/resendVerificationCode";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";
import handleApplicationError from "@app/handles/apiError";
import { IProfileRepository } from "@app/features/Profile/data/profileRepository";
import showNotification from "@app/components/organisms/CustomNotification";
import { TEMAIL_TEMPLATE } from "@app/types";

export type TVerificationViewModel = {
  code: number;
  email: string;
};

export type TResendVerificationEmailViewModel = {
  emailType: TEMAIL_TEMPLATE;
  email: string;
};

const useVerificationCodeViewModel = (repository: IProfileRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const verificationCode = useCallback(
    async (data: TVerificationViewModel, callback?: () => void) => {
      try {
        setLoading(true);
        await verificationCodeUseCase(
          { verificationCode: repository.verificationCode },
          data,
        );
        if (callback) {
          callback();
        } else {
          navigation.goBack();
          showNotification(
            "Parabéns!!!",
            "Sua conta foi ativada com sucesso.",
            "success",
          );
        }
      } catch (error) {
        handleApplicationError.handleError(error, "ALERT");
        setLoading(false);
      }
    },

    [navigation, repository.verificationCode],
  );

  const resendVerificationCodeEmail = useCallback(
    async (data: TResendVerificationEmailViewModel) => {
      try {
        setLoading(true);
        await resendVerificationCodeUseCase(
          { resendVerificationCode: repository.resendVerificationCode },
          data,
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApplicationError.handleError(error);
      }
    },

    [repository.resendVerificationCode],
  );

  return { verificationCode, resendVerificationCodeEmail, isLoading };
};

export { useVerificationCodeViewModel };
