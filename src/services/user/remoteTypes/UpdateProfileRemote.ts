import { OS } from "@app/constants";

export type TUpdateProfileRemote = {
  name?: string;

  lastname?: string;

  password?: string;

  email?: string;

  tokenDeviceId?: string;

  appVersion?: string;

  currency?: string;

  os?: OS;
};
