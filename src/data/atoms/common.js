import { atom } from "recoil";
import { getMonth, getYear } from "utils";

export const todayAtom = atom({
  key: "today",
  default: new Date().toISOString().split("T")[0],
});

export const startMonthAtom = atom({
  key: "startMonth",
  default: "2022-09-01",
});

export const defaultMonthAtom = atom({
  key: "defaultMont",
  default: `${getYear()}${getMonth()}`,
});
