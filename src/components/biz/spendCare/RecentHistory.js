import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { getSpendRecentHistory } from "api/spend";
import { settingProperties } from "utils/property";
import Spend from "./Spend";

const Wrapper = styled.div``;
const OverviewInfo = styled.div`
  margin: 10px;
`;
const OverviewTitle = styled.span``;
const OverviewGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.bgColor.primary};
  border-radius: 10px;
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const OverviewTr = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const OverviewTd = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const RecentHistory = ({ mainCategory, subCategory, store }) => {
  const [recentHistory, setRecentHistory] = useState([]);
  const { isLoading, data } = useQuery("getSpendRecentHistory", () =>
    getSpendRecentHistory({ mainCategory, subCategory })
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

  return !isLoading ? (
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
      <hr />
      <HistoryList>
        {recentHistory?.map((spend, index) => {
          return <Spend key={spend?.id} {...spend} />;
        })}
      </HistoryList>
    </Wrapper>
  ) : null;
};

export default RecentHistory;
