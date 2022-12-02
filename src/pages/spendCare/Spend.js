import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";

import PayMethod from "components/biz/spendCare/PayMethod";
import SelectMonth from "components/common/SelectMonth";
import Card from "components/ui/Card";
import {
  payMethodListSelector,
  spendListAtom,
  spendSearchConditionAtom,
  totalSpendCostSelector,
} from "data/atoms/spend";
import { settingProperties } from "utils/property";
import { getSpendList } from "api/spend";

const Wrapper = styled.div``;
const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 5px;
  gap: 5px;
`;
const Cost = styled.h1`
  font-size: 38px;
  font-weight: 600;
`;
const Box = styled(motion.div)``;
const boxVariants = {
  tap: { scale: 1.05 },
};

const Spend = () => {
  const navigate = useNavigate();
  const [today, month] = useOutletContext();

  const setSearchCondition = useSetRecoilState(spendSearchConditionAtom);
  const setSpendList = useSetRecoilState(spendListAtom);
  const totalSpendCost = useRecoilValue(totalSpendCostSelector);
  const payMethodList = useRecoilValue(payMethodListSelector);

  const [monthKey, setMonthKey] = useState([...month].reverse().join(""));

  const { isLoading, data, refetch } = useQuery("getSpendList", () =>
    getSpendList({ month: month })
  );

  useEffect(() => {
    if (month.length > 0) {
      setSpendList((prevState) => {
        return {
          ...prevState,
          [[...month].reverse().join("")]:
            data?.results.map((item) => {
              return {
                id: item.id,
                ...settingProperties(item.properties),
              };
            }) || [],
        };
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [month]);

  useEffect(() => {
    const monthStr = [...month].reverse().join("");
    if (Object.keys(payMethodList).includes(monthStr)) {
      setMonthKey(monthStr);
    }
  }, [month, payMethodList]);

  const handleClickSpendType = (props) => {
    const { month, payMethod, detailWayName, totalPrice } = props;
    navigate(`spendList/${month}/${payMethod}`, {
      state: { detailWayName, totalPrice },
    });
  };

  return (
    <Wrapper>
      <SummaryInfo>
        <SelectMonth
          today={today}
          month={month}
          setMonth={setSearchCondition}
          type="spend"
        />
        <Cost>{isLoading ? "0" : totalSpendCost} 원</Cost>
        {/* TODO : sliding banner */}
      </SummaryInfo>
      <Card>
        {!isLoading
          ? Object.keys(payMethodList[monthKey]).map((key) => {
              const { detailWayName, totalPrice } =
                payMethodList[monthKey][key];
              return (
                <Box
                  key={key}
                  variants={boxVariants}
                  whileTap="tap"
                  onClick={() =>
                    handleClickSpendType({
                      month: monthKey,
                      payMethod: key,
                      detailWayName: detailWayName,
                      totalPrice: totalPrice,
                    })
                  }
                >
                  <PayMethod
                    detailWayName={detailWayName}
                    totalPrice={totalPrice}
                  />
                </Box>
              );
            })
          : null}
      </Card>
    </Wrapper>
  );
};

export default Spend;
