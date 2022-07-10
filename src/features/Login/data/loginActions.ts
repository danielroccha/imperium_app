import Storage from "@app/configs/storage";
import { dispatchStore } from "@app/configs/store";
import { AuthenticationFlow } from "./loginTypes";
import { Action, Dispatch } from "redux";
import showNotification from "@app/components/organisms/CustomNotification";

export const changeAuthenticationFlow =
  (value: AuthenticationFlow) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: "AUTHENTICATION_FLOW", payload: value });
  };

export const logOut = async (): Promise<void> => {
  await Storage.removeAllKeys();
  dispatchStore(changeAuthenticationFlow("UNAUTHENTICATED"));
  showNotification("Ops!!!", "Sua sessão expirou.", "warning");
};
