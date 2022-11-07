import { useCallback } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import SelectMonth from "../../components/SelectMonth";
import { getSpendList } from "../../data/api";
import { startMonthAtom, todayAtom } from "../../data/atoms/common";
import { spendSearchConditionAtom } from "../../data/atoms/spend";

const Spend = () => {
  const today = useRecoilValue(todayAtom);
  const { month } = useRecoilValue(spendSearchConditionAtom);
  //   const { isLoading, data } = useQuery("getSpendList", getSpendList(1));
  return (
    <>
      <SelectMonth today={today} month={month} type="spend" />
    </>
  );
};

export default Spend;
