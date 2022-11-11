import { atom, selector } from "recoil";
import * as Enums from "../enums";

export const spendSearchConditionAtom = atom({
  key: "spendSearchCondition",
  default: {
    month: [new Date().getMonth() + 1, new Date().getFullYear()],
  },
});

export const spendListAtom = atom({
  key: "spendList",
  default: [],
});

export const totalSpendCostSelector = selector({
  key: "totalSpendCost",
  get: ({ get }) => {
    const list = get(spendListAtom) || [];
    return list.length > 0
      ? list?.map((item) => item.withdraw).reduce((a, b) => a + b)
      : 0;
  },
});

export const spendTypeListSelector = selector({
  key: "spendTypeList",
  get: ({ get }) => {
    const list = get(spendListAtom) || [];
    const types = [...new Set(list.map((item) => item.detailWay))];

    let result = {};
    types.forEach((type) => {
      const dataList = list.filter((item) => item.detailWay === type);
      result[type] = {
        detailWayName: Enums.DETAILWAY.find((item) => item.code === type).value,
        totalPrice: dataList
          .map((item) => item.withdraw)
          .reduce((a, b) => a + b),
        data: dataList,
      };
    });
    return result;
  },
});
