export const ZeroPadding = (num: number) => `0${num}`.substr(-2);
export const FormatDate_YM = (date: Date) => `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}`;
export const FormatDate_YMD = (date: Date) => `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}/${ZeroPadding(date.getDate())}`;
export const CalcBeforeMonth_YM = (propDate: string, months: number) => {
  const date = new Date(parseInt(propDate.substr(0,4)), parseInt(propDate.substr(5,2))-1-months);
  return `${date.getFullYear()}/${ZeroPadding(date.getMonth() + 1)}`;
};