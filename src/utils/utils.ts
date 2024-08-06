export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getIsOlderThanDaysAgo = (daysAgo: number, compareTime: number) => {
  const timestampDaysAgo = new Date().getTime() - daysAgo * 24 * 60 * 60 * 1000;
  return compareTime > timestampDaysAgo;
};
