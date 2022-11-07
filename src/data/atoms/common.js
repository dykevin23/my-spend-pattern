import { atom } from "recoil";

export const todayAtom = atom({
  key: "today",
  default: new Date().toISOString().split("T")[0],
});

export const startMonthAtom = atom({
  key: "startMonth",
  default: "2022-09-01",
});
