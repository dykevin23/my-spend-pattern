import { atom, selector, selectorFamily } from "recoil";
import * as Enums from "data/enums";
import { getMonth, getYear } from "utils";

export const spendSearchConditionAtom = atom({
  key: "spendSearchCondition",
  default: {
    month: `${getYear()}${getMonth()}`,
  },
});

export const spendListAtom = atom({
  key: "spendList",
  default: {},
});

export const totalSpendCostSelector = selector({
  key: "totalSpendCost",
  get: ({ get }) => {
    const { month } = get(spendSearchConditionAtom);
    const spendData = get(spendListAtom) || {};
    const list = spendData[month] || [];
    return list.length > 0
      ? list?.map((item) => item.withdraw).reduce((a, b) => a + b)
      : 0;
  },
});

export const payMethodListSelector = selector({
  key: "payMethodList",
  get: ({ get }) => {
    const spendData = get(spendListAtom) || {};
    let result = {};

    if (Object.keys(spendData).length > 0) {
      Object.keys(spendData).forEach((key) => {
        const types = [
          ...new Set(spendData[key]?.map((item) => item.detailWay)),
        ];

        let typeData = {};
        types.forEach((type) => {
          const dataList = spendData[key].filter(
            (item) => item.detailWay === type
          );
          typeData[type] = {
            detailWayName: Enums.DETAILWAY.find((item) => item.code === type)
              ?.value,
            totalPrice: dataList
              .map((item) => item.withdraw)
              .reduce((a, b) => a + b),
            data: dataList,
          };
        });

        result[key] = typeData;
      });
    }

    return result;
  },
});

export const spendDetailSelector = selectorFamily({
  key: "spendDetail",
  get:
    ({ type, id }) =>
    ({ get }) => {
      const { month } = get(spendSearchConditionAtom);
      const data = get(payMethodListSelector);

      const monthSpendList = data[month][type]?.data || [];
      return monthSpendList.find((item) => item.id);
    },
});
