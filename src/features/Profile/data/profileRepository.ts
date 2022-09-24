import { useCallback } from "react";

import IProfileEntity from "@app/features/Profile/data/IProfileEntity";
import { IUserService } from "@app/services/user";

import { TForgotPasswordRemote } from "@app/services/user/remoteTypes/ForgotPasswordRemote";
import { TVerificationCodeRemote } from "@app/services/user/remoteTypes/VerificationCodeRemote";
import { TChangePasswordRemote } from "@app/services/user/remoteTypes/ChangePasswordRemote";
import { TResendVerificationCodeRemote } from "@app/services/user/remoteTypes/ResendVerificationRemote";
import { TUpdateProfileRemote } from "@app/services/user/remoteTypes/UpdateProfileRemote";

export interface IProfileRepository {
  getProfile(): Promise<IProfileEntity>;
  forgotPassword(data: TForgotPasswordRemote): Promise<void>;
  verificationCode(data: TVerificationCodeRemote): Promise<void>;
  resendVerificationCode(data: TResendVerificationCodeRemote): Promise<void>;
  changePassword(data: TChangePasswordRemote): Promise<void>;
  resetBalance(): Promise<void>;
  updateProfile(data: TUpdateProfileRemote): Promise<void>;
  deleteProfile(): Promise<void>;
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

  const updateProfile = useCallback(
    async (data: TUpdateProfileRemote) => {
      await service.updateProfileService(data);
    },
    [service],
  );

  const resetBalance = useCallback(async () => {
    await service.resetBalanceService();
  }, [service]);

  const deleteProfile = useCallback(async () => {
    await service.deleteProfileService();
  }, [service]);

  return {
    updateProfile,
    getProfile,
    forgotPassword,
    verificationCode,
    resendVerificationCode,
    changePassword,
    resetBalance,
    deleteProfile,
  };
};

export default useProfileRepository;
