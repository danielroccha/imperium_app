import { ICreateAccountService } from "@app/services/createAccout";
import { TSignUpRemote } from "@app/services/createAccout/remoteTypes/TSignUpDataRemote";

export interface ICreateAccountRepository {
  createAccount(data: TSignUpRemote): Promise<void>;
}

const useCreateAccountRepository = (
  service: ICreateAccountService,
): ICreateAccountRepository => {
  const createAccount = async (data: TSignUpRemote) => {
    await service.createAccountService(data);
  };

  return {
    createAccount,
  };
};

export default useCreateAccountRepository;
