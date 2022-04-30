export type AuthenticationFlow = "AUTHENTICATED" | "UNAUTHENTICATED" | null;

export const AUTHENTICATION_FLOW = "AUTHENTICATION_FLOW";

export interface IAuthenticationFlowState {
  authenticationFlow: AuthenticationFlow;
}

interface AuthenticationFlowAction {
  type: typeof AUTHENTICATION_FLOW;
  payload: AuthenticationFlow;
}

export type AuthenticationFlowActionsTypes = AuthenticationFlowAction;
