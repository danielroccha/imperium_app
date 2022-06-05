import { useCallback } from "react";
import IProfileEntity from "./IProfileEntity";
import { IUserService } from "@app/services/user";

export interface IProfileRepository {
  getProfile(): Promise<IProfileEntity>;
}

const useProfileRepository = (service: IUserService): IProfileRepository => {
  const getProfile = useCallback(async () => {
    const response = await service.profileService();
    return response;
  }, [service]);

  return {
    getProfile,
  };
};

export default useProfileRepository;
