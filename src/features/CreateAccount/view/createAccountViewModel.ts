import { useCallback, useState } from "react";

// import handleApplicationError from "@app/handles/apiError";
import { createAccountUseCase } from "@app/features/CreateAccount/domain/useCases/createAccountUseCase";
import { useNavigation } from "@react-navigation/native";
import { ICreateAccountRepository } from "../data/createAccountRepository";
import RootStackNavigation from "@app/types/RootStackParams";
import handleApplicationError from "@app/handles/apiError";

export type TCreateAccountViewModel = {
  name: string;
  email: string;
  password: string;
};

const useCreateAccountViewModel = (repository: ICreateAccountRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigation>();

  const createAccount = useCallback(
    async (data: TCreateAccountViewModel) => {
      try {
        setLoading(true);
        await createAccountUseCase(
          { createAccount: repository.createAccount },
          data,
        );
        navigation.replace("VerificationCode", {
          email: data.email,
          emailType: "WELCOME",
          title: "Validação de conta",
        });
      } catch (error) {
        handleApplicationError.handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.createAccount],
  );

  return { createAccount, isLoading };
};

export { useCreateAccountViewModel };
