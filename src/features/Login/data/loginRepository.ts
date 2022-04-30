import Storage from "@app/configs/storage";
import { IAuthService } from "@app/services/login";
import { TAuthenticationDataRemote } from "@app/services/login/remoteTypes/TAuthenticationDataRemote";

export interface IUseLoginRepository {
  login(data: TAuthenticationDataRemote): Promise<void>;
}

const useLoginRepository = (service: IAuthService): IUseLoginRepository => {
  const login = async (data: TAuthenticationDataRemote) => {
    const response = await service.loginService(data);
    const { accessToken } = response;
    const { refreshToken } = response;
    Storage.saveApiKey(accessToken);
    Storage.saveRefreshToken(refreshToken);
  };

  return {
    login,
  };
};

export default useLoginRepository;
