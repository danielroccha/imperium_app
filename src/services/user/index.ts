import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import IProfileEntity from "@app/features/Profile/data/IProfileEntity";

export interface IUserService {
  profileService: () => Promise<IProfileEntity>;
}

const profileService = async (): Promise<IProfileEntity> =>
  api.get(API_SERVICES.USER_SERVICES.PROFILE).then(res => res.data);

const userService: IUserService = {
  profileService,
};

export default userService;
