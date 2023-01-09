import { selectorFamily } from "recoil";
import { spendListAtom } from "./spend";

export const categoryTop5Selector = selectorFamily({
  key: "categoryTop5",
  get:
    ({ thisMonth }) =>
    ({ get }) => {
      const spendData = get(spendListAtom) || {};
      const spendList = spendData[thisMonth] || [];
      const categories = [
        ...new Set(spendList.map((item) => item.mainCategory)),
      ];

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

export const favoritesTop5Selector = selectorFamily({
  key: "favoritesTop5",
  get:
    ({ thisMonth }) =>
    ({ get }) => {
      const spendData = get(spendListAtom) || {};
      const spendList = spendData[thisMonth] || [];
      const categories = [
        ...new Set(spendList.map((item) => item.mainCategory)),
      ];

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

export const CostTop5Selector = selectorFamily({
  key: "costTop5",
  get:
    ({ thisMonth }) =>
    ({ get }) => {
      const spendData = get(spendListAtom) || {};
      const spendList = spendData[thisMonth] || [];

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
