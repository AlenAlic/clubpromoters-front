export const ADMIN = 0;
export const ORGANIZER = 10;
export const CLUB_OWNER = 20;
export const HOSTESS = 21;
export const PROMOTER = 30;

export const MONTHS = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

export const DAILY = "daily";
export const WEEKLY = "weekly";
export const BIWEEKLY = "bi-weekly";

export const LANGUAGES = ["nl", "gb"];
export const INVOICE_LANGUAGES = ["nl_NL", "en_US"];

export const INTERVAL_OPTIONS = [
  ...[...Array(9).keys()].map(n => n * 50 + 100),
  ...[...Array(9).keys()].map(n => n * 500 + 1000),
  ...[...Array(5).keys()].map(n => n * 1000 + 6000)
];
