import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import { TSignUpRemote } from "./remoteTypes/TSignUpDataRemote";

export interface ICreateAccountService {
  createAccountService: (data: TSignUpRemote) => Promise<void>;
}

const createAccountService = async (data: TSignUpRemote): Promise<void> =>
  api.post(API_SERVICES.SIGN_UP_SERVICES.SIGN_UP, data).then(res => res.data);

const signUpService: ICreateAccountService = {
  createAccountService,
};

export default signUpService;
