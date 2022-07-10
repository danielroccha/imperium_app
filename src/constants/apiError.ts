type USER_ERRORS =
  | "ERROR_USER_0000"
  | "ERROR_USER_0001"
  | "ERROR_USER_0002"
  | "ERROR_USER_0003";

type LOGIN_ERRORS = "ERROR_LOGIN_0000";

export type APPLICATION_ERROR_CODE = USER_ERRORS | LOGIN_ERRORS;
