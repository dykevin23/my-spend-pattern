import { callApi } from "../utils/axios";

export const getExpenditureList = async (params) => {
  const { data } = await callApi({
    url: "/list",
    paramObject: params,
  });

  return data;
};
