import { useCallback, useState } from "react";

import { loginUseCase } from "@app/features/Login/domain/useCases/loginUseCase";
import { IUseLoginRepository } from "@app/features/Login/data/loginRepository";
import handleApplicationError, {
  ApplicationError,
} from "@app/handles/apiError";
import { useNavigation } from "@react-navigation/native";
import RootStackNavigation from "@app/types/RootStackParams";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useLoginViewModel = (repository: IUseLoginRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const tryLogin = useCallback(
    async (data: TLoginViewModel) => {
      setLoading(true);
      try {
        await loginUseCase({ login: repository.login }, data);
      } catch (error) {
        setLoading(false);
        if (
          handleApplicationError.isApplicationError(error) &&
          (error as ApplicationError).response.data?.error.code ===
            "ERROR_USER_0003"
        ) {
          navigation.navigate("VerificationCode", {
            email: data.email,
            emailType: "WELCOME",
            title: "Sua conta ainda precisa ser validada",
          });
        } else {
          handleApplicationError.handleError(error);
        }
      }
    },
    [repository.login, navigation],
  );

  return { tryLogin, isLoading };
};

export { useLoginViewModel };
