import I18n from "@app/languages/I18n";

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

export const INSTAGRAM_URL =
  "https://instagram.com/walletimperium?igshid=YmMyMTA2M2Y=";

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
  I18n.t("months.january"),
  I18n.t("months.february"),
  I18n.t("months.march"),
  I18n.t("months.april"),
  I18n.t("months.may"),
  I18n.t("months.june"),
  I18n.t("months.july"),
  I18n.t("months.august"),
  I18n.t("months.september"),
  I18n.t("months.october"),
  I18n.t("months.november"),
  I18n.t("months.december"),
];

export const profileMenu: {
  icon: string;
  name: string;
  action: (action?: () => void) => void | null;
}[] = [
  {
    icon: "log-out",
    name: "Sair",
    action: (callback?: () => void) => {
      if (callback) return callback();
      return null;
    },
  },
];

export const expensesCategorySugestion: TCategorySugestion[] = [
  {
    name: I18n.t("categories.suggestions.alimentation"),
    color: "#FF0000",
    icon: "food-drumstick",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.transport"),
    color: "#000",
    icon: "bus",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.leisure"),
    color: "#FF8072",
    icon: "gamepad-variant",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.fuel"),
    color: "#E6A22E",
    icon: "fuel",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.clothes"),
    color: "#8CC40B",
    icon: "tshirt-crew",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.services"),
    color: "#302FF5",
    icon: "file-document",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.household_expenses"),
    color: "#6B0531",
    icon: "home-analytics",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.supermarket"),
    color: "#8C20DB",
    icon: "cart",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.education"),
    color: "#18A1F2",
    icon: "book-education",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.health"),
    color: "#00850F",
    icon: "heart",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.travel"),
    color: "#FF6F01",
    icon: "airplane",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.aesthetics"),
    color: "#4DB380",
    icon: "hair-dryer",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.digital_services"),
    color: "#6680B3",
    icon: "television",
    type: TRANSACTION_TYPE.EXPENSE,
  },
  {
    name: I18n.t("categories.suggestions.other"),
    color: "#b0b0b0",
    icon: "dots-horizontal-circle",
    type: TRANSACTION_TYPE.EXPENSE,
  },
];

export const incomesCategorySugestion: TCategorySugestion[] = [
  {
    name: I18n.t("categories.suggestions.salary"),
    color: "#66991A",
    icon: "cash",
    type: TRANSACTION_TYPE.INCOME,
  },
  {
    name: I18n.t("categories.suggestions.bonus"),
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

export type Currency = { name: string; code: string; symbol: string };

export const currencyList: Currency[] = [
  { name: I18n.t("currencies.afghan_afghani"), code: "AFA", symbol: "؋" },
  { name: I18n.t("currencies.albanian_lek"), code: "ALL", symbol: "Lek" },
  { name: I18n.t("currencies.algerian_dinar"), code: "DZD", symbol: "دج" },
  { name: I18n.t("currencies.angolan_kwanza"), code: "AOA", symbol: "Kz" },
  { name: I18n.t("currencies.argentine_peso"), code: "ARS", symbol: "$" },
  { name: I18n.t("currencies.armenian_dram"), code: "AMD", symbol: "֏" },
  { name: I18n.t("currencies.aruban_florin"), code: "AWG", symbol: "ƒ" },
  { name: I18n.t("currencies.australian_dollar"), code: "AUD", symbol: "$" },
  { name: I18n.t("currencies.azerbaijani_manat"), code: "AZN", symbol: "m" },
  { name: I18n.t("currencies.bahamian_dollar"), code: "BSD", symbol: "B$" },
  { name: I18n.t("currencies.bahraini_dinar"), code: "BHD", symbol: ".د.ب" },
  { name: I18n.t("currencies.bangladeshi_taka"), code: "BDT", symbol: "৳" },
  { name: I18n.t("currencies.barbadian_dollar"), code: "BBD", symbol: "Bds$" },
  { name: I18n.t("currencies.belarusian_ruble"), code: "BYR", symbol: "Br" },
  { name: I18n.t("currencies.belgian_franc"), code: "BEF", symbol: "fr" },
  { name: I18n.t("currencies.belize_dollar"), code: "BZD", symbol: "$" },
  { name: I18n.t("currencies.bermudan_dollar"), code: "BMD", symbol: "$" },
  { name: I18n.t("currencies.bhutanese_ngultrum"), code: "BTN", symbol: "Nu." },
  { name: I18n.t("currencies.bitcoin"), code: "BTC", symbol: "฿" },
  { name: I18n.t("currencies.bolivian_boliviano"), code: "BOB", symbol: "Bs." },
  {
    name: I18n.t("currencies.bosnia-herzegovina_convertible_mark"),
    code: "BAM",
    symbol: "KM",
  },
  { name: I18n.t("currencies.botswanan_pula"), code: "BWP", symbol: "P" },
  { name: I18n.t("currencies.brazilian_real"), code: "BRL", symbol: "R$" },
  {
    name: I18n.t("currencies.british_pound_sterling"),
    code: "GBP",
    symbol: "£",
  },
  { name: I18n.t("currencies.brunei_dollar"), code: "BND", symbol: "B$" },
  { name: I18n.t("currencies.bulgarian_lev"), code: "BGN", symbol: "Лв." },
  { name: I18n.t("currencies.burundian_franc"), code: "BIF", symbol: "FBu" },
  { name: I18n.t("currencies.cambodian_riel"), code: "KHR", symbol: "KHR" },
  { name: I18n.t("currencies.canadian_dollar"), code: "CAD", symbol: "$" },
  { name: I18n.t("currencies.cape_verdean_escudo"), code: "CVE", symbol: "$" },
  {
    name: I18n.t("currencies.cayman_islands_dollar"),
    code: "KYD",
    symbol: "$",
  },
  { name: I18n.t("currencies.cfa_franc_bceao"), code: "XOF", symbol: "CFA" },
  { name: I18n.t("currencies.cfa_franc_beac"), code: "XAF", symbol: "FCFA" },
  { name: I18n.t("currencies.cfp_franc"), code: "XPF", symbol: "₣" },
  { name: I18n.t("currencies.chilean_peso"), code: "CLP", symbol: "$" },
  { name: I18n.t("currencies.chinese_yuan"), code: "CNY", symbol: "¥" },
  { name: I18n.t("currencies.colombian_peso"), code: "COP", symbol: "$" },
  { name: I18n.t("currencies.comorian_franc"), code: "KMF", symbol: "CF" },
  { name: I18n.t("currencies.congolese_franc"), code: "CDF", symbol: "FC" },
  { name: I18n.t("currencies.costa_rican_colã³n"), code: "CRC", symbol: "₡" },
  { name: I18n.t("currencies.croatian_kuna"), code: "HRK", symbol: "kn" },
  {
    name: I18n.t("currencies.cuban_convertible_peso"),
    code: "CUC",
    symbol: "$, CUC",
  },
  {
    name: I18n.t("currencies.czech_republic_koruna"),
    code: "CZK",
    symbol: "Kč",
  },
  { name: I18n.t("currencies.danish_krone"), code: "DKK", symbol: "Kr." },
  { name: I18n.t("currencies.djiboutian_franc"), code: "DJF", symbol: "Fdj" },
  { name: I18n.t("currencies.dominican_peso"), code: "DOP", symbol: "$" },
  {
    name: I18n.t("currencies.east_caribbean_dollar"),
    code: "XCD",
    symbol: "$",
  },
  { name: I18n.t("currencies.egyptian_pound"), code: "EGP", symbol: "ج.م" },
  { name: I18n.t("currencies.eritrean_nakfa"), code: "ERN", symbol: "Nfk" },
  { name: I18n.t("currencies.estonian_kroon"), code: "EEK", symbol: "kr" },
  { name: I18n.t("currencies.ethiopian_birr"), code: "ETB", symbol: "Nkf" },
  { name: I18n.t("currencies.euro"), code: "EUR", symbol: "€" },
  {
    name: I18n.t("currencies.falkland_islands_pound"),
    code: "FKP",
    symbol: "£",
  },
  { name: I18n.t("currencies.fijian_dollar"), code: "FJD", symbol: "FJ$" },
  { name: I18n.t("currencies.gambian_dalasi"), code: "GMD", symbol: "D" },
  { name: I18n.t("currencies.georgian_lari"), code: "GEL", symbol: "ლ" },
  { name: I18n.t("currencies.german_mark"), code: "DEM", symbol: "DM" },
  { name: I18n.t("currencies.ghanaian_cedi"), code: "GHS", symbol: "GH₵" },
  { name: I18n.t("currencies.gibraltar_pound"), code: "GIP", symbol: "£" },
  {
    name: I18n.t("currencies.greek_drachma"),
    code: "GRD",
    symbol: "₯, Δρχ, Δρ",
  },
  { name: I18n.t("currencies.guatemalan_quetzal"), code: "GTQ", symbol: "Q" },
  { name: I18n.t("currencies.guinean_franc"), code: "GNF", symbol: "FG" },
  { name: I18n.t("currencies.guyanaese_dollar"), code: "GYD", symbol: "$" },
  { name: I18n.t("currencies.haitian_gourde"), code: "HTG", symbol: "G" },
  { name: I18n.t("currencies.honduran_lempira"), code: "HNL", symbol: "L" },
  { name: I18n.t("currencies.hong_kong_dollar"), code: "HKD", symbol: "$" },
  { name: I18n.t("currencies.hungarian_forint"), code: "HUF", symbol: "Ft" },
  { name: I18n.t("currencies.icelandic_krã³na"), code: "ISK", symbol: "kr" },
  { name: I18n.t("currencies.indian_rupee"), code: "INR", symbol: "₹" },
  { name: I18n.t("currencies.indonesian_rupiah"), code: "IDR", symbol: "Rp" },
  { name: I18n.t("currencies.iranian_rial"), code: "IRR", symbol: "﷼" },
  { name: I18n.t("currencies.iraqi_dinar"), code: "IQD", symbol: "د.ع" },
  { name: I18n.t("currencies.israeli_new_sheqel"), code: "ILS", symbol: "₪" },
  { name: I18n.t("currencies.italian_lira"), code: "ITL", symbol: "L,£" },
  { name: I18n.t("currencies.jamaican_dollar"), code: "JMD", symbol: "J$" },
  { name: I18n.t("currencies.japanese_yen"), code: "JPY", symbol: "¥" },
  { name: I18n.t("currencies.jordanian_dinar"), code: "JOD", symbol: "ا.د" },
  { name: I18n.t("currencies.kazakhstani_tenge"), code: "KZT", symbol: "лв" },
  { name: I18n.t("currencies.kenyan_shilling"), code: "KES", symbol: "KSh" },
  { name: I18n.t("currencies.kuwaiti_dinar"), code: "KWD", symbol: "ك.د" },
  { name: I18n.t("currencies.kyrgystani_som"), code: "KGS", symbol: "лв" },
  { name: I18n.t("currencies.laotian_kip"), code: "LAK", symbol: "₭" },
  { name: I18n.t("currencies.latvian_lats"), code: "LVL", symbol: "Ls" },
  { name: I18n.t("currencies.lebanese_pound"), code: "LBP", symbol: "£" },
  { name: I18n.t("currencies.lesotho_loti"), code: "LSL", symbol: "L" },
  { name: I18n.t("currencies.liberian_dollar"), code: "LRD", symbol: "$" },
  { name: I18n.t("currencies.libyan_dinar"), code: "LYD", symbol: "د.ل" },
  { name: I18n.t("currencies.lithuanian_litas"), code: "LTL", symbol: "Lt" },
  { name: I18n.t("currencies.macanese_pataca"), code: "MOP", symbol: "$" },
  { name: I18n.t("currencies.macedonian_denar"), code: "MKD", symbol: "ден" },
  { name: I18n.t("currencies.malagasy_ariary"), code: "MGA", symbol: "Ar" },
  { name: I18n.t("currencies.malawian_kwacha"), code: "MWK", symbol: "MK" },
  { name: I18n.t("currencies.malaysian_ringgit"), code: "MYR", symbol: "RM" },
  { name: I18n.t("currencies.maldivian_rufiyaa"), code: "MVR", symbol: "Rf" },
  {
    name: I18n.t("currencies.mauritanian_ouguiya"),
    code: "MRO",
    symbol: "MRU",
  },
  { name: I18n.t("currencies.mauritian_rupee"), code: "MUR", symbol: "₨" },
  { name: I18n.t("currencies.mexican_peso"), code: "MXN", symbol: "$" },
  { name: I18n.t("currencies.moldovan_leu"), code: "MDL", symbol: "L" },
  { name: I18n.t("currencies.mongolian_tugrik"), code: "MNT", symbol: "₮" },
  { name: I18n.t("currencies.moroccan_dirham"), code: "MAD", symbol: "MAD" },
  { name: I18n.t("currencies.mozambican_metical"), code: "MZM", symbol: "MT" },
  { name: I18n.t("currencies.myanmar_kyat"), code: "MMK", symbol: "K" },
  { name: I18n.t("currencies.namibian_dollar"), code: "NAD", symbol: "$" },
  { name: I18n.t("currencies.nepalese_rupee"), code: "NPR", symbol: "₨" },
  {
    name: I18n.t("currencies.netherlands_antillean_guilder"),
    code: "ANG",
    symbol: "ƒ",
  },
  { name: I18n.t("currencies.new_taiwan_dollar"), code: "TWD", symbol: "$" },
  { name: I18n.t("currencies.new_zealand_dollar"), code: "NZD", symbol: "$" },
  { name: I18n.t("currencies.nicaraguan_cã³rdoba"), code: "NIO", symbol: "C$" },
  { name: I18n.t("currencies.nigerian_naira"), code: "NGN", symbol: "₦" },
  { name: I18n.t("currencies.north_korean_won"), code: "KPW", symbol: "₩" },
  { name: I18n.t("currencies.norwegian_krone"), code: "NOK", symbol: "kr" },
  { name: I18n.t("currencies.omani_rial"), code: "OMR", symbol: ".ع.ر" },
  { name: I18n.t("currencies.pakistani_rupee"), code: "PKR", symbol: "₨" },
  { name: I18n.t("currencies.panamanian_balboa"), code: "PAB", symbol: "B/." },
  {
    name: I18n.t("currencies.papua_new_guinean_kina"),
    code: "PGK",
    symbol: "K",
  },
  { name: I18n.t("currencies.paraguayan_guarani"), code: "PYG", symbol: "₲" },
  { name: I18n.t("currencies.peruvian_nuevo_sol"), code: "PEN", symbol: "S/." },
  { name: I18n.t("currencies.philippine_peso"), code: "PHP", symbol: "₱" },
  { name: I18n.t("currencies.polish_zloty"), code: "PLN", symbol: "zł" },
  { name: I18n.t("currencies.qatari_rial"), code: "QAR", symbol: "ق.ر" },
  { name: I18n.t("currencies.romanian_leu"), code: "RON", symbol: "lei" },
  { name: I18n.t("currencies.russian_ruble"), code: "RUB", symbol: "₽" },
  { name: I18n.t("currencies.rwandan_franc"), code: "RWF", symbol: "FRw" },
  { name: I18n.t("currencies.salvadoran_colã³n"), code: "SVC", symbol: "₡" },
  { name: I18n.t("currencies.samoan_tala"), code: "WST", symbol: "SAT" },
  { name: I18n.t("currencies.saudi_riyal"), code: "SAR", symbol: "﷼" },
  { name: I18n.t("currencies.serbian_dinar"), code: "RSD", symbol: "din" },
  { name: I18n.t("currencies.seychellois_rupee"), code: "SCR", symbol: "SRe" },
  {
    name: I18n.t("currencies.sierra_leonean_leone"),
    code: "SLL",
    symbol: "Le",
  },
  { name: I18n.t("currencies.singapore_dollar"), code: "SGD", symbol: "$" },
  { name: I18n.t("currencies.slovak_koruna"), code: "SKK", symbol: "Sk" },
  {
    name: I18n.t("currencies.solomon_islands_dollar"),
    code: "SBD",
    symbol: "Si$",
  },
  { name: I18n.t("currencies.somali_shilling"), code: "SOS", symbol: "Sh.so." },
  { name: I18n.t("currencies.south_african_rand"), code: "ZAR", symbol: "R" },
  { name: I18n.t("currencies.south_korean_won"), code: "KRW", symbol: "₩" },
  {
    name: I18n.t("currencies.special_drawing_rights"),
    code: "XDR",
    symbol: "SDR",
  },
  { name: I18n.t("currencies.sri_lankan_rupee"), code: "LKR", symbol: "Rs" },
  { name: I18n.t("currencies.st._helena_pound"), code: "SHP", symbol: "£" },
  { name: I18n.t("currencies.sudanese_pound"), code: "SDG", symbol: ".س.ج" },
  { name: I18n.t("currencies.surinamese_dollar"), code: "SRD", symbol: "$" },
  { name: I18n.t("currencies.swazi_lilangeni"), code: "SZL", symbol: "E" },
  { name: I18n.t("currencies.swedish_krona"), code: "SEK", symbol: "kr" },
  { name: I18n.t("currencies.swiss_franc"), code: "CHF", symbol: "CHf" },
  { name: I18n.t("currencies.syrian_pound"), code: "SYP", symbol: "LS" },
  {
    name: I18n.t("currencies.são_tomé_and_príncipe_dobra"),
    code: "STD",
    symbol: "Db",
  },
  { name: I18n.t("currencies.tajikistani_somoni"), code: "TJS", symbol: "SM" },
  { name: I18n.t("currencies.tanzanian_shilling"), code: "TZS", symbol: "TSh" },
  { name: I18n.t("currencies.thai_baht"), code: "THB", symbol: "฿" },
  { name: I18n.t("currencies.tongan_pa'anga"), code: "TOP", symbol: "$" },
  {
    name: I18n.t("currencies.trinidad_&_tobago_dollar"),
    code: "TTD",
    symbol: "$",
  },
  { name: I18n.t("currencies.tunisian_dinar"), code: "TND", symbol: "ت.د" },
  { name: I18n.t("currencies.turkish_lira"), code: "TRY", symbol: "₺" },
  { name: I18n.t("currencies.turkmenistani_manat"), code: "TMT", symbol: "T" },
  { name: I18n.t("currencies.ugandan_shilling"), code: "UGX", symbol: "USh" },
  { name: I18n.t("currencies.ukrainian_hryvnia"), code: "UAH", symbol: "₴" },
  {
    name: I18n.t("currencies.united_arab_emirates_dirham"),
    code: "AED",
    symbol: "إ.د",
  },
  { name: I18n.t("currencies.uruguayan_peso"), code: "UYU", symbol: "$" },
  { name: I18n.t("currencies.us_dollar"), code: "USD", symbol: "$" },
  { name: I18n.t("currencies.uzbekistan_som"), code: "UZS", symbol: "лв" },
  { name: I18n.t("currencies.vanuatu_vatu"), code: "VUV", symbol: "VT" },
  { name: I18n.t("currencies.venezuelan_bolãvar"), code: "VEF", symbol: "Bs" },
  { name: I18n.t("currencies.vietnamese_dong"), code: "VND", symbol: "₫" },
  { name: I18n.t("currencies.yemeni_rial"), code: "YER", symbol: "﷼" },
  { name: I18n.t("currencies.zambian_kwacha"), code: "ZMK", symbol: "ZK" },
];
