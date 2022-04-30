import { useCallback, useState } from "react";

// import { handleError } from "@app/configs/api";
import { createAccountUseCase } from "@app/features/CreateAccount/domain/useCases/createAccountUseCase";
import { useNavigation } from "@react-navigation/native";
import { ICreateAccountRepository } from "../data/createAccountRepository";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TCreateAccountViewModel = {
  name: string;
  email: string;
  password: string;
};

const useCreateAccountViewModel = (repository: ICreateAccountRepository) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  const createAccount = useCallback(
    async (data: TCreateAccountViewModel) => {
      try {
        setLoading(true);
        await createAccountUseCase(
          { createAccount: repository.createAccount },
          data,
        );
        navigation.navigate("Login");
      } catch (error) {
        // handleError(error);
        setLoading(false);
      }
    },

    [navigation, repository.createAccount],
  );

  return { createAccount, isLoading };
};

export { useCreateAccountViewModel };
