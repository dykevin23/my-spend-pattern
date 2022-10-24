import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  background-color: #bdc3c7;
  height: 100px;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const ExpenditureInfo = styled.div``;

const PriceInfo = styled.div``;

const Card = ({ withdraw }) => {
  return (
    <StyledCard>
      <ExpenditureInfo />
      <PriceInfo>
        <span>{withdraw}원</span>
      </PriceInfo>
    </StyledCard>
  );
};

export default Card;
