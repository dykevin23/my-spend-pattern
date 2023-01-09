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
import FixedExpense from "components/biz/spendCare/FixedExpense";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
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

  const [searchMonth, setSearchMonth] = useState(month);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [thisMonthData, setThisMonthData] = useState([]);

  const { isLoading, data } = useQuery(
    ["getSpendList", searchMonth, nextCursor],
    () => getSpendList({ month: searchMonth, nextCursor })
  );

  useEffect(() => {
    setSearchMonth(month);
    setNextCursor(undefined);
  }, [month]);

  useEffect(() => {
    if (data) {
      saveData(
        data?.results
          ?.map((item) => {
            return {
              id: item.id,
              ...settingProperties(item.properties),
            };
          })
          .filter((item) => item.mainCategory) || []
      );
    }
  }, [data]);

  useEffect(() => {
    if (thisMonthData.length > 0) {
      if (data.has_more) {
        setNextCursor(data.next_cursor);
      } else {
        setSpendList((prev) => {
          return {
            ...prev,
            [month]: thisMonthData,
          };
        });
        setThisMonthData([]);
      }
    }
  }, [thisMonthData]);

  const saveData = (result) => {
    setThisMonthData((prev) => {
      const filter = result.filter((item) => item.id !== prev.id);
      return prev.concat(filter);
    });
  };

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
          ? payMethodList[month] &&
            Object.keys(payMethodList[month])?.map((key) => {
              const { detailWayName, totalPrice } = payMethodList[month][key];
              return (
                <Box
                  key={key}
                  variants={boxVariants}
                  whileTap="tap"
                  onClick={() =>
                    handleClickSpendType({
                      month: month,
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
      <Card>
        <FixedExpense />
      </Card>
    </Wrapper>
  );
};

export default Spend;
