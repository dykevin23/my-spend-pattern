import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SummaryMark = styled.div`
  width: 40px;
  height: 60px;
  background-color: #a29bfe;
  /* margin-right: 10px; */
`;
const SummaryName = styled.span``;
const SummaryPrice = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Summary = ({ detailWayName, totalPrice }) => {
  return (
    <Wrapper>
      <SummaryInfo>
        <SummaryName>{detailWayName}</SummaryName>
        <SummaryPrice>{totalPrice} 원</SummaryPrice>
      </SummaryInfo>
      <SummaryMark></SummaryMark>
    </Wrapper>
  );
};

export default Summary;
