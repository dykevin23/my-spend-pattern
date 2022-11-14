import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  spendListAtom,
  spendSearchConditionAtom,
  spendTypeListSelector,
} from "../../data/atoms/spend";
import { getDayOfWeek } from "../../utils";
import { motion } from "framer-motion";
import SelectMonth from "../../components/SelectMonth";
import { todayAtom } from "../../data/atoms/common";
import { useQuery } from "react-query";
import { getSpendList } from "../../data/api";
import { settingProperties } from "../../utils/property";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 5px;
`;
const PreviousButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;
const Content = styled.div``;
const Summary = styled.div``;
const List = styled.ul``;
const Box = styled.li`
  display: flex;
  background-color: "#b2bec3";
  gap: 10px;
  flex-direction: column;
  padding: 10px;
`;
const DateInfo = styled.span`
  font-size: 13px;
  font-weight: 300;
`;
const SpendCard = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 5px;
`;
const spendCardVariants = {
  hover: { scale: 1.05, backgroundColor: "#f1f2f6" },
};
const SpendMark = styled.div`
  width: 30px;
  height: 30px;
  background-color: #74b9ff;
  border-radius: 100%;
  margin-left: 15px;
  margin-right: 10px;
`;
const SpendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SpendPrice = styled.span`
  align-items: center;
  font-weight: 700;
`;
const SpendStore = styled.span`
  display: flex;
  font-size: 12px;
  font-weight: 300;
  align-items: center;
`;

const SpendList = () => {
  const {
    state: { type },
  } = useLocation();
  const navigate = useNavigate();

  const today = useRecoilValue(todayAtom);
  const monthAtom = useRecoilValue(spendSearchConditionAtom);
  const spendTypeList = useRecoilValue(spendTypeListSelector);
  const setSpendList = useSetRecoilState(spendListAtom);
  const [listByDate, setListByDate] = useState({});
  const [month, setMonth] = useState(monthAtom);
  const { data, refetch } = useQuery(
    "getSpendList",
    () => getSpendList({ month: month.month }),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    setSpendList((prevState) => {
      return {
        ...prevState,
        [[...month.month].reverse().join("")]:
          data?.results.map((item) => {
            return {
              id: item.id,
              ...settingProperties(item.properties),
            };
          }) || [],
      };
    });
  }, [data]);

  useEffect(() => {
    const list =
      spendTypeList[[...month.month].reverse().join("")][type]?.data || [];

    if (list.length > 0) {
      const getDates = [...new Set(list.map((item) => item.date))].sort(
        (a, b) =>
          parseInt(b.replace(/[^0-9]/g, "")) -
          parseInt(a.replace(/[^0-9]/g, ""))
      );

      let spendListByDate = {};
      getDates.forEach((date) => {
        spendListByDate[date] = list.filter((item) => item.date === date);
      });

      setListByDate(spendListByDate);
    } else {
      setListByDate({});
    }
  }, [type, spendTypeList]);

  useEffect(() => {
    refetch(month.month);
  }, [month]);

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <SelectMonth today={today} month={month.month} setMonth={setMonth} />
        <div></div>
      </Header>
      <Content>
        <Summary></Summary>
        <List>
          {Object.keys(listByDate).map((date) => {
            const list = listByDate[date];
            return (
              <Box key={date}>
                <DateInfo>{getDayOfWeek(date)}</DateInfo>
                {list.map((item) => {
                  return (
                    <SpendCard
                      key={item.id}
                      variants={spendCardVariants}
                      whileHover="hover"
                    >
                      <SpendMark></SpendMark>
                      <SpendInfo>
                        <SpendPrice>-{item.withdraw} 원</SpendPrice>
                        <SpendStore>{item.store}</SpendStore>
                      </SpendInfo>
                    </SpendCard>
                  );
                })}
              </Box>
            );
          })}
        </List>
      </Content>
    </Wrapper>
  );
};

export default SpendList;
