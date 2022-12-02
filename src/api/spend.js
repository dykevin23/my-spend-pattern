import { MAINCATEGORY, SUBCATEGORY } from "data/enums";
import { getSearchDateRange, get3MonthRange } from "utils";
import { callApi } from "utils/axios";

export const getSpendList = async (params) => {
  const { month } = params;
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

export const getSpendList3MonthById = async (params) => {
  const { mainCategory, subCategory } = params;
  const mainCategoryValue = MAINCATEGORY.find(
    (item) => item.code === mainCategory
  );
  const subCategoryValue = SUBCATEGORY.find(
    (item) => item.code === subCategory
  );

  const { data } = await callApi({
    url: "/spendList",
    paramObject: {
      filterObj: {
        and: [
          ...get3MonthRange(),
          {
            property: "mainCategory",
            select: {
              equals: mainCategoryValue.value,
            },
          },
          {
            property: "subCategory",
            select: {
              equals: subCategoryValue.value,
            },
          },
        ],
      },
    },
  });

  return data;
};
