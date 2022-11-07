import { callApi } from "../utils/axios";

export const getSpendList = async (params) => {
  console.log("### params => ", params);
  const { data } = await callApi({
    url: "/spendList",
    paramObject: params,
  });

  return data;
};

export const getExpenditureList = async (params) => {
  const { data } = await callApi({
    url: "/list",
    paramObject: params,
  });

  return data;
};
