import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import SelectMonth from "../../components/SelectMonth";
import { getSpendList } from "../../data/api";
import { todayAtom } from "../../data/atoms/common";
import {
  spendListAtom,
  spendSearchConditionAtom,
  totalSpendCostSelector,
} from "../../data/atoms/spend";
import { settingProperties } from "../../utils/property";

const Spend = () => {
  const today = useRecoilValue(todayAtom);
  const { month } = useRecoilValue(spendSearchConditionAtom);
  const [spendList, setSpendList] = useRecoilState(spendListAtom);
  const totalSpendCost = useRecoilValue(totalSpendCostSelector);
  const { isLoading, data } = useQuery("getSpendList", () =>
    getSpendList({ month })
  );

  useEffect(() => {
    setSpendList(
      data?.results.map((item) => {
        return {
          id: item.id,
          ...settingProperties(item.properties),
        };
      })
    );
  }, [data]);

  return (
    <>
      <SelectMonth today={today} month={month} type="spend" />
      {isLoading ? "Loading..." : totalSpendCost}
    </>
  );
};

export default Spend;
