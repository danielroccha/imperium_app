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
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export enum OPTIONS_PERIOD {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum TRANSACTION_OPTIONS {
  RECURRENCE = "recurrence",
  INSTALLMENT = "installment",
}

export type TCategorySugestion = {
  name: string;
  color: string;
  icon: string;
  type: TRANSACTION_TYPE;
};

export type MONTH_PERIOD = "PREVIOUS" | "CURRENT" | "NEXT";

export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const expensesCategorySugestion: TCategorySugestion[] = [
  {
    name: "Alimentação",
    color: "#FF0000",
    icon: "food-drumstick",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Transporte",
    color: "#000",
    icon: "bus",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Lazer",
    color: "#FF8072",
    icon: "gamepad-variant",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Combustivel",
    color: "#E6A22E",
    icon: "fuel",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Roupas",
    color: "#8CC40B",
    icon: "tshirt-crew",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Serviços",
    color: "#302FF5",
    icon: "file-document",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Despesas Domésticas",
    color: "#6B0531",
    icon: "home-analytics",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Supermercado",
    color: "#8C20DB",
    icon: "cart",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Educação",
    color: "#18A1F2",
    icon: "book-education",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Saúde",
    color: "#00850F",
    icon: "heart",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Viagem",
    color: "#FF6F01",
    icon: "airplane",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Estética",
    color: "#4DB380",
    icon: "hair-dryer",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Serviços Digitais",
    color: "#6680B3",
    icon: "television",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: "Outros",
    color: "#b0b0b0",
    icon: "dots-horizontal-circle",
    type: TRANSACTION_TYPE.EXPENSE,
  },
];

export const incomesCategorySugestion: TCategorySugestion[] = [
  {
    name: "Salário",
    color: "#66991A",
    icon: "cash",
    type: TRANSACTION_TYPE.INCOME,
  },
  {
    name: "Dividendos",
    color: "#00B3E6",
    icon: "chart-timeline-variant-shimmer",
    type: TRANSACTION_TYPE.INCOME,
  },
];

export const iconsSugestion = [
  "silverware-variant",
  "line-scan",
  "umbrella-beach",
  "flag",
  "pill",
  "cash",
  "dog",
  "foot-print",
  "music",
  "movie-open",
  "shopping",
  "tree",
  "kettlebell",
  "microsoft-xbox-controller",
  "movie",
  "ninja",
  "glass-mug",
  "incognito-circle",
  "lipstick",
  "ring",
  "medical-bag",
  "piggy-bank",
  "plus-thick",
  "baby-bottle-outline",
  "baby",
  "bathtub",
  "battery",
  "bicycle",
  "book-open-variant",
  "cellphone",
  "chart-line",
  "tooth",
  "train",
  "truck",
  "wallet",
  "web",
];

export const colorsSugestion = [
  "#FFB399",
  "#FF33FF",
  "#8e9F99",
  "#E6B333",
  "#3366E6",
  "#B34D4D",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#FF99E6",
  "#CCFF1A",
  "#E6331A",
  "#33FFCC",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#4DB3FF",
  "#E666B3",
  "#33991A",
  "#B3B31A",
  "#FF3380",
  "#4DB380",
  "#6666FF",
];
