export type OS = "ios" | "android";

export type TypeNotification =
  | "success"
  | "warning"
  | "info"
  | "error"
  | "points";

export const NOTIFICATION_TYPE = {
  SUCCESS: "success" as TypeNotification,
  WARNING: "warning" as TypeNotification,
  INFO: "info" as TypeNotification,
  ERROR: "error" as TypeNotification,
  POINTS: "points" as TypeNotification,
};

export enum TRANSACTION_TYPE {
  EXPENSE = "expense",
  INCOME = "income",
}
