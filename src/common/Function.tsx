export const ZeroPadding = (num: number) => `0${num}`.substr(-2);
export const FormatDate_YM = (date: Date) => `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}`;
export const FormatDate_YMD = (date: Date) => `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}/${ZeroPadding(date.getDate())}`;