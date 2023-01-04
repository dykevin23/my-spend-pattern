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
const SpendSummary = () => {
  const spend = useRecoilValue(spendListAtom);

  useEffect(() => {
    console.log(spend);
    if (spend.length > 0) {
      console.log(spend.filter((item) => !item.mainCategory));
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
