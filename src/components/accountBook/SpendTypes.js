import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  spendSearchConditionAtom,
  spendTypeListSelector,
} from "data/atoms/spend";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  gap: 10px;
`;
const Box = styled(motion.ul)`
  display: flex;
  gap: 10px;
  padding: 10px;
`;
const boxVariants = {
  hover: { scale: 1.05, backgroundColor: "#f1f2f6" },
};
const SpendMark = styled.div`
  width: 25px;
  height: 40px;
  background-color: #74b9ff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const SpendInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: center;
  gap: 5px;
`;
const SpendTypeName = styled.span`
  font-size: 14px;
`;
const SpendPrice = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const SpendTypes = () => {
  const { month } = useRecoilValue(spendSearchConditionAtom);
  const spendTypeList = useRecoilValue(spendTypeListSelector);
  const navigate = useNavigate();
  const [monthKey, setMonthKey] = useState([...month].reverse().join(""));

  const handleClickSpendType = (type) => {
    navigate("./list", { state: { type } });
  };

  useEffect(() => {
    const monthStr = [...month].reverse().join("");
    if (Object.keys(spendTypeList).includes(monthStr)) {
      setMonthKey(monthStr);
    }
  }, [month, spendTypeList]);

  return (
    <Wrapper>
      {Object.keys(spendTypeList[monthKey]).map((key) => {
        const { detailWayName, totalPrice } = spendTypeList[monthKey][key];
        return (
          <Box
            key={key}
            variants={boxVariants}
            whileHover="hover"
            onClick={() => handleClickSpendType(key)}
          >
            <SpendMark></SpendMark>
            <SpendInfo>
              <SpendTypeName>{detailWayName}</SpendTypeName>
              <SpendPrice>{totalPrice} 원</SpendPrice>
            </SpendInfo>
          </Box>
        );
      })}
    </Wrapper>
  );
};

export default SpendTypes;
