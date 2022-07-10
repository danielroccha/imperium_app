import { useCallback } from "react";
import IProfileEntity from "./IProfileEntity";
import { IUserService } from "@app/services/user";
import { TForgotPasswordRemote } from "@app/services/user/remoteTypes/ForgotPasswordRemote";
import { TVerificationCodeRemote } from "@app/services/user/remoteTypes/VerificationCodeRemote";
import { TChangePasswordRemote } from "@app/services/user/remoteTypes/ChangePasswordRemote";
import { TResendVerificationCodeRemote } from "@app/services/user/remoteTypes/ResendVerificationRemote";

export interface IProfileRepository {
  getProfile(): Promise<IProfileEntity>;
  forgotPassword(data: TForgotPasswordRemote): Promise<void>;
  verificationCode(data: TVerificationCodeRemote): Promise<void>;
  resendVerificationCode(data: TResendVerificationCodeRemote): Promise<void>;
  changePassword(data: TChangePasswordRemote): Promise<void>;
}

const useProfileRepository = (service: IUserService): IProfileRepository => {
  const getProfile = useCallback(async () => {
    const response = await service.profileService();
    return response;
  }, [service]);

  const forgotPassword = useCallback(
    async (data: TForgotPasswordRemote) => {
      await service.forgotPasswordService(data);
    },
    [service],
  );

  const verificationCode = useCallback(
    async (data: TVerificationCodeRemote) => {
      await service.verificationCodeService(data);
    },
    [service],
  );

  const resendVerificationCode = useCallback(
    async (data: TResendVerificationCodeRemote) => {
      await service.resendEmailService(data);
    },
    [service],
  );

  const changePassword = useCallback(
    async (data: TChangePasswordRemote) => {
      await service.changePasswordService(data);
    },
    [service],
  );

  return {
    getProfile,
    forgotPassword,
    verificationCode,
    resendVerificationCode,
    changePassword,
  };
};

export default useProfileRepository;
