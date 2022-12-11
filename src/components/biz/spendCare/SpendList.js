import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import SelectMonth from "components/common/SelectMonth";
import Tag from "components/ui/Tag";
import {
  payMethodListSelector,
  spendListAtom,
  spendSearchConditionAtom,
} from "data/atoms/spend";
import { MAINCATEGORY } from "data/enums";
import { getDayOfWeek } from "utils";
import { settingProperties } from "utils/property";
import { getSpendList } from "api/spend";
import Spend from "./Spend";

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
  font-size: 30px;
  font-weight: 600;
`;

const Content = styled.div``;
const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const Name = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const Cost = styled.span`
  font-size: 24px;
`;
const Mark = styled.svg`
  width: 50px;
  height: 90px;
  background-color: #f6e58d;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const TagArea = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
`;
const Spends = styled.ul``;
const Box = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;
const DateInfo = styled.span``;

const SpendList = () => {
  const { month: monthStr, payMethod } = useParams();
  const navigate = useNavigate();
  const [today, month] = useOutletContext();

  const setSearchCondition = useSetRecoilState(spendSearchConditionAtom);
  const setSpendList = useSetRecoilState(spendListAtom);
  const payMethodList = useRecoilValue(payMethodListSelector);
  const [spendDates, setSpendDates] = useState({});
  const [mainCategoryTags, setMainCategoryTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [summaryInfo, setSummaryInfo] = useState({});

  const { data, refetch } = useQuery(
    "getSpendList",
    () => getSpendList({ month: month }),
    { enabled: false }
  );

  useEffect(() => {
    setSpendList((prevState) => {
      return {
        ...prevState,
        [monthStr]:
          data?.results?.map((item) => {
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
    } = payMethodList[monthStr][payMethod];

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
      setSpendDates(spendListByDate);

      const mainCategorys = [...new Set(data.map((item) => item.mainCategory))];
      setMainCategoryTags(
        MAINCATEGORY.filter((item) => mainCategorys.includes(item.code))
      );
    } else {
      setSpendDates({});
    }

    setSummaryInfo({
      detailWayName,
      data,
      totalPrice,
    });
  }, [payMethod, payMethodList]);

  useEffect(() => {
    refetch(month);
  }, [month]);

  const handleSpendCardClick = (item) => {
    navigate(`/spendCare/spendDetail/${item?.id}`, { state: { detail: item } });
  };

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <SelectMonth
          today={today}
          month={month}
          setMonth={setSearchCondition}
          type="spend"
        />
        <div />
      </Header>
      <Content>
        <Summary>
          <Info>
            <Name>{summaryInfo?.detailWayName}</Name>
            <Cost>{summaryInfo?.totalPrice} 원</Cost>
          </Info>
          <Mark></Mark>
        </Summary>
        <hr />
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
        <Spends>
          {Object.keys(spendDates).map((date) => {
            const list = spendDates[date].filter((item) =>
              selectedTag === "" ? item : item.mainCategory === selectedTag
            );
            return list.length > 0 ? (
              <Box key={date}>
                <DateInfo>{getDayOfWeek(date)}</DateInfo>
                {list.map((item) => {
                  return (
                    <Spend
                      key={item?.id}
                      {...item}
                      onClick={handleSpendCardClick}
                    />
                  );
                })}
              </Box>
            ) : null;
          })}
        </Spends>
      </Content>
    </Wrapper>
  );
};

export default SpendList;
