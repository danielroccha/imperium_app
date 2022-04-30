import { TLoginViewModel } from "@app/features/Login/view/loginViewModel";
import { IUseLoginRepository } from "@app/features/Login/data/loginRepository";
import { dispatchStore } from "@app/configs/store";
import { changeAuthenticationFlow } from "../../data/loginActions";

const loginUseCase = async (
  repository: Pick<IUseLoginRepository, "login">,
  data: TLoginViewModel,
) => {
  const { email, password } = data;

  await repository.login({ email, password });
  dispatchStore(changeAuthenticationFlow("AUTHENTICATED"));
};

export { loginUseCase };
