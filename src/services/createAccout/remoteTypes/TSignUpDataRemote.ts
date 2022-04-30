import { OS } from "@app/constants";

export type TSignUpRemote = {
  name: string;
  lastname: string;
  password: string;
  email: string;
  os: OS;
  tokenDeviceId: string;
  appVersion: string;
};
