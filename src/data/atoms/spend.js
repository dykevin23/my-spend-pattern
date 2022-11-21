import { atom, selector } from "recoil";
import * as Enums from "enums";

export const spendSearchConditionAtom = atom({
  key: "spendSearchCondition",
  default: {
    month: [new Date().getMonth() + 1, new Date().getFullYear()],
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
    const list = spendData[[...month].reverse().join("")] || [];
    return list.length > 0
      ? list?.map((item) => item.withdraw).reduce((a, b) => a + b)
      : 0;
  },
});

export const spendTypeListSelector = selector({
  key: "spendTypeList",
  get: ({ get }) => {
    const spendData = get(spendListAtom) || {};
    let result = {};

    if (Object.keys(spendData).length > 0) {
      Object.keys(spendData).forEach((key) => {
        const types = [
          ...new Set(spendData[key].map((item) => item.detailWay)),
        ];

        let typeData = {};
        types.forEach((type) => {
          const dataList = spendData[key].filter(
            (item) => item.detailWay === type
          );
          typeData[type] = {
            detailWayName: Enums.DETAILWAY.find((item) => item.code === type)
              .value,
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
