import styled from "styled-components";

const Box = styled.div`
  display: flex;
  padding: 5px;
`;

const Mark = styled.svg`
  width: 30px;
  height: 50px;
  background-color: #f6e58d;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  gap: 5px;
`;

const Name = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const Cost = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const PayMethod = ({ detailWayName, totalPrice }) => {
  return (
    <Box>
      <Mark />
      <Info>
        <Name>{detailWayName}</Name>
        <Cost>{totalPrice} 원</Cost>
      </Info>
    </Box>
  );
};

export default PayMethod;
