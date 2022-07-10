import { TEMAIL_TEMPLATE } from "@app/types";

export type TResendVerificationCodeRemote = {
  email: string;
  emailType: TEMAIL_TEMPLATE;
};
