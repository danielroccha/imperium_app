import {
  IAuthenticationFlowState,
  AuthenticationFlowActionsTypes,
  AUTHENTICATION_FLOW,
} from "./login-types";

const INITIAL_STATE: IAuthenticationFlowState = {
  authenticationFlow: null,
};

export default (
  state = INITIAL_STATE,
  action: AuthenticationFlowActionsTypes,
): IAuthenticationFlowState => {
  switch (action.type) {
    case AUTHENTICATION_FLOW:
      return { ...state, authenticationFlow: action.payload };

    default:
      return state;
  }
};
