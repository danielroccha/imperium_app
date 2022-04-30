const AUTHENTICATION_SERVICES = {
  LOGIN: "/authentication",
  REFRESH_TOKEN: "/authentication/refresh-token",
};

const SIGN_UP_SERVICES = {
  SIGN_UP: "/users",
};

const TRANSACTION_SERVICES = {
  BALANCE_RESUME: (monthId: number) => `/transaction/resume?monthId=${monthId}`,
};

const API_SERVICES = {
  AUTHENTICATION_SERVICES,
  SIGN_UP_SERVICES,
  TRANSACTION_SERVICES,
};

export default API_SERVICES;
