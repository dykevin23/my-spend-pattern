import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Cost from "../../components/Cost";
import SelectMonth from "../../components/SelectMonth";
import SpendTypes from "../../components/accountBook/SpendTypes";
import { getSpendList } from "../../data/api";
import { todayAtom } from "../../data/atoms/common";
import {
  spendListAtom,
  spendSearchConditionAtom,
  totalSpendCostSelector,
} from "../../data/atoms/spend";
import { settingProperties } from "../../utils/property";

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 10px;
`;

const Spend = () => {
  const today = useRecoilValue(todayAtom);
  const { month } = useRecoilValue(spendSearchConditionAtom);
  const setSpendList = useSetRecoilState(spendListAtom);
  const totalSpendCost = useRecoilValue(totalSpendCostSelector);
  const setSearchCondition = useSetRecoilState(spendSearchConditionAtom);
  const { isLoading, data, refetch } = useQuery("getSpendList", () =>
    getSpendList({ month })
  );

  useEffect(() => {
    refetch();
  }, [month]);

  useEffect(() => {
    if (month.length > 0) {
      setSpendList((prevState) => {
        return {
          ...prevState,
          [[...month].reverse().join("")]:
            data?.results.map((item) => {
              return {
                id: item.id,
                ...settingProperties(item.properties),
              };
            }) || [],
        };
      });
    }
  }, [data]);

  return (
    <>
      <Wrapper>
        <SelectMonth
          today={today}
          month={month}
          setMonth={setSearchCondition}
          type="spend"
        />
      </Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Cost price={totalSpendCost} />
          <SpendTypes />
        </>
      )}
    </>
  );
};

export default Spend;
