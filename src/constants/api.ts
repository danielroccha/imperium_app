import { TRANSACTION_TYPE } from ".";

const AUTHENTICATION_SERVICES = {
  LOGIN: "/authentication",
  REFRESH_TOKEN: "/authentication/refresh-token",
};

const USER_SERVICES = {
  PROFILE: "/user/profile",
};

const SIGN_UP_SERVICES = {
  SIGN_UP: "/user",
};

const TRANSACTION_SERVICES = {
  BALANCE_RESUME: (monthId: number, year: number) =>
    `/transaction/resume?monthId=${monthId}&year=${year}`,
  CREATE_TRANSACTION: "/transaction",
  GET_TRANSACTION: (transactionId: string) => `/transaction/${transactionId}`,
  EDIT_TRANSACTION: (transactionId: string) => `/transaction/${transactionId}`,
  DELETE_TRANSACTION: (transactionId: string) =>
    `/transaction/${transactionId}`,
  GET_TRANSACTION_GROUP_BY_CATEGORY: (
    monthId: number,
    year: number,
    typeTrasaction: TRANSACTION_TYPE,
  ) =>
    `/transaction/categories?monthId=${monthId}&year=${year}&type=${typeTrasaction}`,
};

const CATEGORY_SERVICES = {
  LIST_CATEGORIES: (type?: TRANSACTION_TYPE) => `/category/list?type=${type}`,
  CREATE_CATEGORY: "/category",
  EDIT_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
  DELETE_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
  GET_CATEGORY: (categoryId: string) => `/category/${categoryId}`,
};

const RECURRENCE_SERVICES = {
  LIST_RECURRENCES: "/recurrence/list",
  CREATE_RECURRENCE: "/recurrence",
  EDIT_RECURRENCE: (recurrenceId: string) => `/recurrence/${recurrenceId}`,
  DELETE_RECURRENCE: (recurrenceId: string) => `/recurrence/${recurrenceId}`,
  GET_RECURRENCE: (recurrenceId: string) => `/recurrence/${recurrenceId}`,
};

const API_SERVICES = {
  AUTHENTICATION_SERVICES,
  SIGN_UP_SERVICES,
  TRANSACTION_SERVICES,
  CATEGORY_SERVICES,
  RECURRENCE_SERVICES,
  USER_SERVICES,
};

export default API_SERVICES;
