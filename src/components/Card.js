import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  background-color: #bdc3c7;
  height: 100px;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const ExpenditureInfo = styled.div`
  display: grid;
  width: 70%;
  padding: 10px;
  background-color: #60a3bc;
`;

const PriceInfo = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  background-color: #f6b93b;
`;

const Card = ({
  mainCategory,
  subCategory,
  store,
  withdraw,
  detailWay,
  date,
  title,
  ...rest
}) => {
  // console.log(rest);
  return (
    <StyledCard>
      <ExpenditureInfo>
        <span>제목: {title}</span>
        <span>카테고리: {mainCategory}</span>
        <span>상세 카테고리: {subCategory}</span>
        <span>구매처: {store}</span>
        <span>지불방법: {detailWay}</span>
        <span>날짜: {date}</span>
      </ExpenditureInfo>

      <PriceInfo>
        <span>{withdraw}원</span>
      </PriceInfo>
    </StyledCard>
  );
};

export default Card;
