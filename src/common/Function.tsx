export const ZeroPadding = (num: number) => `0${num}`.substr(-2);
export const FormatDate = (date: Date) => `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}/${ZeroPadding(date.getDate())}`;