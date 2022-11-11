import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Cost from "../../components/Cost";
import SelectMonth from "../../components/SelectMonth";
import { getSpendList } from "../../data/api";
import { todayAtom } from "../../data/atoms/common";
import {
  spendListAtom,
  spendSearchConditionAtom,
  spendTypeListSelector,
  totalSpendCostSelector,
} from "../../data/atoms/spend";
import { settingProperties } from "../../utils/property";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  gap: 5px;
`;
const SpendType = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const SpendSummary = styled.li``;

const Spend = () => {
  const today = useRecoilValue(todayAtom);
  const { month } = useRecoilValue(spendSearchConditionAtom);
  const setSpendList = useSetRecoilState(spendListAtom);
  const totalSpendCost = useRecoilValue(totalSpendCostSelector);
  const spendTypeList = useRecoilValue(spendTypeListSelector);
  const { isLoading, data, refetch } = useQuery("getSpendList", () =>
    getSpendList({ month })
  );

  console.log(spendTypeList);

  useEffect(() => {
    if (!isLoading) refetch();
  }, [month, isLoading]);

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
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Cost price={totalSpendCost} />
          <Wrapper>
            {Object.keys(spendTypeList).map((key) => {
              const { detailWayName, totalPrice } = spendTypeList[key];
              console.log(spendTypeList[key]);
              return (
                <SpendType>
                  <SpendSummary>{detailWayName}</SpendSummary>
                  <SpendSummary>{totalPrice} 원</SpendSummary>
                </SpendType>
              );
            })}
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Spend;
