import { atom, selector } from "recoil";

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
