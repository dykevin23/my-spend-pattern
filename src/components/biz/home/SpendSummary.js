import { spendListAtom } from "data/atoms/spend";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
/**
 * 이번달 소비요약
 * @returns
 */
const SpendSummary = ({ thisMonth }) => {
  const spend = useRecoilValue(spendListAtom);

  useEffect(() => {
    const thisMonthSpend = spend[thisMonth] || [];
    if (thisMonthSpend.length > 0) {
      // console.log("### here => ", thisMonthSpend);

      const exceptLunchList = thisMonthSpend.filter(
        (item) => item.subCategory === "lunch"
      );
      const exceptBabyList = thisMonthSpend.filter(
        (item) => item.mainCategory === "baby" && !item.isSpend
      );
      const exceptFixedList = thisMonthSpend.filter(
        (item) => item.fixType === "fix"
      );

      // console.log("### lunch => ", exceptLunchList);
      // console.log("### baby => ", exceptBabyList);
      // console.log("### fixed => ", exceptFixedList);
    }
  }, [spend]);

  return (
    <Wrapper>
      <Header>이번달 소비요약</Header>
      <Content></Content>
    </Wrapper>
  );
};

export default SpendSummary;
