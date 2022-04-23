import Storage from "@app/configs/Storage";
import { dispatchStore } from "@app/configs/store";
import { AuthenticationFlow } from "./login-types";
import { Action, Dispatch } from "redux";

export const changeAuthenticationFlow =
  (value: AuthenticationFlow) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: "AUTHENTICATION_FLOW", payload: value });
  };

export const logOut = async (): Promise<void> => {
  await Storage.removeAllKeys();
  dispatchStore(changeAuthenticationFlow("UNAUTHENTICATED"));
  setTimeout(() => {
    // store.dispatch<any>(clearProfileUser());
  }, 3000);
};
