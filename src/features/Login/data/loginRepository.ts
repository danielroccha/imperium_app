import Storage, { KEYS } from "@app/configs/storage";
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
    Storage.save(KEYS.TOKEN, accessToken);
    Storage.save(KEYS.REFRESH_TOKEN, refreshToken);
  };

  return {
    login,
  };
};

export default useLoginRepository;
