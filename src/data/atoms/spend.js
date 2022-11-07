import { atom } from "recoil";

export const spendSearchConditionAtom = atom({
  key: "spendSearchCondition",
  default: {
    month: [new Date().getMonth() + 1, new Date().getFullYear()],
  },
});
