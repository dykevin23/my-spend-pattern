import { getSpendList3MonthById } from "data/api";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { settingProperties } from "utils/property";

const Wrapper = styled.div`
  background-color: white;
`;
const OverviewInfo = styled.div`
  margin: 10px;
  padding: 20px;
`;
const OverviewTitle = styled.span`
  font-size: 20px;
`;
const OverviewGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const OverviewTr = styled.span``;
const OverviewTd = styled.span`
  font-weight: 700;
`;

const List = styled.ul``;
const SpendCard = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 10px;
  gap: 10px;
`;
const CardMark = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #3498db;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Price = styled.span`
  font-size: 18px;
`;
const Store = styled.span`
  font-size: 14px;
`;

const RecentSpendHistory = ({ mainCategory, subCategory, store }) => {
  const [recentHistory, setRecentHistory] = useState([]);
  const { isLoading, data } = useQuery("getSpendList3MonthById", () =>
    getSpendList3MonthById({ mainCategory, subCategory })
  );

  useEffect(() => {
    setRecentHistory(
      data?.results
        .map((item) => {
          return {
            id: item.id,
            ...settingProperties(item.properties),
          };
        })
        .filter((item) => item.store === store)
    );
  }, [data]);

  return isLoading ? (
    <Wrapper>
      <OverviewInfo>
        <OverviewTitle>최근 3개월간 거래 내역</OverviewTitle>
        <OverviewGroup>
          <Overview>
            <OverviewTr>거래 횟수</OverviewTr>
            <OverviewTd>{recentHistory?.length || 0} 회</OverviewTd>
          </Overview>
          <Overview>
            <OverviewTr>총 금액</OverviewTr>
            <OverviewTd>
              {`- ${
                recentHistory
                  ?.map((item) => item.withdraw)
                  .reduce((a, b) => Number(a) + Number(b), []) || 0
              } 원`}
            </OverviewTd>
          </Overview>
        </OverviewGroup>
      </OverviewInfo>
      <List>
        {recentHistory.map((spend) => {
          return (
            <SpendCard key={spend.id}>
              <CardMark></CardMark>
              <CardContent>
                <Price>{`- ${spend.withdraw} 원`}</Price>
                <Store>{spend.store}</Store>
              </CardContent>
            </SpendCard>
          );
        })}
      </List>
    </Wrapper>
  ) : null;
};

export default RecentSpendHistory;
