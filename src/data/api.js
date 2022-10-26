export const getExpenditureList = async () => {
  return await (await fetch("/list")).json();
};
