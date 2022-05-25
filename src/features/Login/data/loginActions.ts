import Storage from "@app/configs/storage";
import { dispatchStore, store } from "@app/configs/store";
import { AuthenticationFlow } from "./loginTypes";
import { Action, Dispatch } from "redux";

export const changeAuthenticationFlow =
  (value: AuthenticationFlow) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: "AUTHENTICATION_FLOW", payload: value });
  };

export const logOut = async (): Promise<void> => {
  await Storage.removeAllKeys();
  dispatchStore(changeAuthenticationFlow("UNAUTHENTICATED"));
  await Storage.removeAllKeys();
  store.dispatch<any>(changeAuthenticationFlow("UNAUTHENTICATED"));
};
