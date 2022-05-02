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

const CATEGORY_SERVICES = {
  LIST_CATEGORIES: "/category/list",
  CREATE_CATEGORY: "/category",
  EDIT_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
  DELETE_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
  GET_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
};

const API_SERVICES = {
  AUTHENTICATION_SERVICES,
  SIGN_UP_SERVICES,
  TRANSACTION_SERVICES,
  CATEGORY_SERVICES,
};

export default API_SERVICES;
