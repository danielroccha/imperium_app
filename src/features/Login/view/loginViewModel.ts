import { useCallback, useState } from "react";

import { loginUseCase } from "@app/features/Login/domain/useCases/loginUseCase";
import { IUseLoginRepository } from "@app/features/Login/data/loginRepository";
import { handleError } from "@app/configs/api";

export type TLoginViewModel = {
  email: string;
  password: string;
};

const useLoginViewModel = (repository: IUseLoginRepository) => {
  const [isLoading, setLoading] = useState(false);

  const tryLogin = useCallback(
    async (data: TLoginViewModel) => {
      try {
        setLoading(true);
        await loginUseCase({ login: repository.login }, data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    },

    [repository.login],
  );

  return { tryLogin, isLoading };
};

export { useLoginViewModel };
