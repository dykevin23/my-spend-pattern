import styled from "styled-components";
import { motion } from "framer-motion";

const SpendItem = styled(motion.div)`
  display: flex;
  align-items: center;
`;
const itemVariants = {
  tap: { scale: 1.05 },
};
const ItemMark = styled.svg`
  width: 40px;
  height: 40px;
  background-color: #74b9ff;
  border-radius: 100%;
  margin-right: 10px;
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Cost = styled.span`
  font-size: 16px;
`;
const Store = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;

const Spend = ({ onClick, ...item }) => {
  return (
    <SpendItem
      variants={itemVariants}
      whileTap="tap"
      onClick={() => onClick(item)}
    >
      <ItemMark></ItemMark>
      <ItemInfo>
        <Cost>-{item?.withdraw} 원</Cost>
        <Store>{item?.store}</Store>
      </ItemInfo>
    </SpendItem>
  );
};

export default Spend;
