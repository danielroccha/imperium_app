import api from "@app/configs/api";
import { ILoginEntity } from "@app/features/Login/data/ILoginEntity";
import { TAuthenticationDataRemote } from "@app/services/login/remoteTypes/TAuthenticationDataRemote";
import API_SERVICES from "@app/constants/api";

export interface IAuthService {
  loginService: (data: TAuthenticationDataRemote) => Promise<ILoginEntity>;
}

const loginService = async (
  data: TAuthenticationDataRemote,
): Promise<ILoginEntity> =>
  api
    .post(API_SERVICES.AUTHENTICATION_SERVICES.LOGIN, data)
    .then(res => res.data);

const authentitcationService: IAuthService = {
  loginService,
};

export default authentitcationService;
