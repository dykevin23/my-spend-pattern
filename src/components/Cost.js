import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 30px;
  margin: 10px;
  padding: 10px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 30px;
  font-weight: 400;
`;

const Cost = ({ price }) => {
  return (
    <Wrapper>
      <Price>{price}원</Price>
    </Wrapper>
  );
};

export default Cost;
