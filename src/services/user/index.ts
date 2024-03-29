import IProfileEntity from "@app/features/Profile/data/IProfileEntity";

import { TForgotPasswordRemote } from "@app/services/user/remoteTypes/ForgotPasswordRemote";
import { TChangePasswordRemote } from "@app/services/user/remoteTypes/ChangePasswordRemote";
import { TVerificationCodeRemote } from "@app/services/user/remoteTypes/VerificationCodeRemote";
import { TResendVerificationCodeRemote } from "@app/services/user/remoteTypes/ResendVerificationRemote";

import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import { TUpdateProfileRemote } from "./remoteTypes/UpdateProfileRemote";

export interface IUserService {
  profileService: () => Promise<IProfileEntity>;
  forgotPasswordService: (data: TForgotPasswordRemote) => Promise<void>;
  verificationCodeService: (data: TVerificationCodeRemote) => Promise<void>;
  resendEmailService: (data: TResendVerificationCodeRemote) => Promise<void>;
  changePasswordService: (data: TChangePasswordRemote) => Promise<void>;
  resetBalanceService: () => Promise<void>;
  updateProfileService: (data: TUpdateProfileRemote) => Promise<void>;
  deleteProfileService: () => Promise<void>;
}

const profileService = async (): Promise<IProfileEntity> =>
  api.get(API_SERVICES.USER_SERVICES.PROFILE).then(res => res.data);

const forgotPasswordService = async (
  data: TForgotPasswordRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.USER_SERVICES.FORGOT_PASSWORD, data)
    .then(res => res.data);

const verificationCodeService = async (
  data: TVerificationCodeRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.USER_SERVICES.VERIFICATION_CODE, data)
    .then(res => res.data);

const resendEmailService = async (
  data: TResendVerificationCodeRemote,
): Promise<void> =>
  api.post(API_SERVICES.USER_SERVICES.RESEND_EMAIL, data).then(res => res.data);

const changePasswordService = async (
  data: TChangePasswordRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.USER_SERVICES.CHANGE_PASSWORD, data)
    .then(res => res.data);

const resetBalanceService = async (): Promise<void> =>
  api.post(API_SERVICES.USER_SERVICES.RESET_BALANCE).then(res => res.data);

const updateProfileService = async (
  data: TUpdateProfileRemote,
): Promise<void> =>
  api.put(API_SERVICES.USER_SERVICES.PROFILE, data).then(res => res.data);

const deleteProfileService = async (): Promise<void> =>
  api.post(API_SERVICES.USER_SERVICES.DELETE_BALANCE).then(res => res.data);

const userService: IUserService = {
  profileService,
  forgotPasswordService,
  verificationCodeService,
  changePasswordService,
  resendEmailService,
  resetBalanceService,
  updateProfileService,
  deleteProfileService,
};

export default userService;
