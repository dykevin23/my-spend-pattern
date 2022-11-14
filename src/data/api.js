import { getSearchDateRange } from "../utils";
import { callApi } from "../utils/axios";

export const getSpendList = async (params) => {
  const { month } = params;
  console.log("### getSpendList => ", month);
  const { data } = await callApi({
    url: "/spendList",
    paramObject: {
      filterObj: {
        and: [...getSearchDateRange(month)],
      },
    },
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
