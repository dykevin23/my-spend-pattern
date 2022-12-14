import { selector } from "recoil";
import { spendListAtom, spendSearchConditionAtom } from "./spend";

export const categoryTop5Selector = selector({
  key: "categoryTop5",
  get: ({ get }) => {
    const { month } = get(spendSearchConditionAtom);
    const spendData = get(spendListAtom) || {};
    const spendList = spendData[[...month].reverse().join("")] || [];
    const categories = [...new Set(spendList.map((item) => item.mainCategory))];

    let data = categories.map((category) => {
      const list = spendList.filter((item) => item.mainCategory === category);
      return {
        category: category,
        list: list,
        cost: list
          .map((item) => item.withdraw)
          .reduce((a, b) => Number(a) + Number(b), []),
      };
    });

    return data.sort((a, b) => b.cost - a.cost);
  },
});

export const favoritesTop5Selector = selector({
  key: "favoritesTop5",
  get: ({ get }) => {
    const { month } = get(spendSearchConditionAtom);
    const spendData = get(spendListAtom) || {};
    const spendList = spendData[[...month].reverse().join("")] || [];
    const categories = [...new Set(spendList.map((item) => item.mainCategory))];

    let data = categories.map((category) => {
      const list = spendList.filter((item) => item.mainCategory === category);
      return {
        category: category,
        list: list,
        count: list.length,
      };
    });

    return data.sort((a, b) => b.count - a.count);
  },
});

export const CostTop5Selector = selector({
  key: "costTop5",
  get: ({ get }) => {
    const { month } = get(spendSearchConditionAtom);
    const spendData = get(spendListAtom) || {};
    const spendList = spendData[[...month].reverse().join("")] || [];

    const sorting = spendList
      .map((item) => {
        return {
          id: item.id,
          withdraw: item.withdraw || 0,
        };
      })
      .sort((a, b) => b.withdraw - a.withdraw)
      .slice(0, 5);

    return sorting.map((item) => {
      return spendList.find((item2) => item2.id === item.id);
    });
  },
});
