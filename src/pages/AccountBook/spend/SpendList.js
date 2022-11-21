import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  spendListAtom,
  spendSearchConditionAtom,
  spendTypeListSelector,
} from "data/atoms/spend";
import { getDayOfWeek } from "utils";
import { motion } from "framer-motion";
import SelectMonth from "components/SelectMonth";
import { todayAtom } from "data/atoms/common";
import { useQuery } from "react-query";
import { getSpendList } from "data/api";
import { settingProperties } from "utils/property";
import Tag from "components/Tag";
import { MAINCATEGORY } from "data/enums";
import Summary from "components/accountBook/Summary";

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

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Box = styled.li`
  display: flex;
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
  width: 40px;
  height: 40px;
  background-color: #74b9ff;
  border-radius: 100%;
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

const TagArea = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
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
  const [monthKey, setMonthKey] = useState([...month.month].reverse().join(""));
  const [summaryInfo, setSummaryInfo] = useState({});
  const [mainCategoryTags, setMainCategoryTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

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
        [monthKey]:
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
    const {
      detailWayName = "",
      data = [],
      totalPrice = 0,
    } = spendTypeList[monthKey][type];

    if (data.length > 0) {
      const getDates = [...new Set(data.map((item) => item.date))].sort(
        (a, b) =>
          parseInt(b.replace(/[^0-9]/g, "")) -
          parseInt(a.replace(/[^0-9]/g, ""))
      );

      let spendListByDate = {};
      getDates.forEach((date) => {
        spendListByDate[date] = data.filter((item) => item.date === date);
      });
      setListByDate(spendListByDate);

      const mainCategorys = [...new Set(data.map((item) => item.mainCategory))];
      setMainCategoryTags(
        MAINCATEGORY.filter((item) => mainCategorys.includes(item.code))
      );
    } else {
      setListByDate({});
    }

    setSummaryInfo({
      detailWayName,
      data,
      totalPrice,
    });
  }, [type, spendTypeList]);

  useEffect(() => {
    refetch(month.month);
    setMonthKey([...month.month].reverse().join(""));
  }, [month]);

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <SelectMonth today={today} month={month.month} setMonth={setMonth} />
        <div></div>
      </Header>
      <Content>
        <Summary {...summaryInfo} />
        <TagArea>
          {[{ code: "", value: "전체", color: "black" }]
            .concat(mainCategoryTags)
            .map((category, index) => {
              return (
                <Tag
                  isActive={selectedTag === category.code}
                  key={index}
                  name={category.value}
                  {...category}
                  onClick={() => setSelectedTag(category.code)}
                />
              );
            })}
        </TagArea>

        <List>
          {Object.keys(listByDate).map((date) => {
            const list = listByDate[date].filter((item) =>
              selectedTag === "" ? item : item.mainCategory === selectedTag
            );
            return list.length > 0 ? (
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
            ) : null;
          })}
        </List>
      </Content>
    </Wrapper>
  );
};

export default SpendList;
