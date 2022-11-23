import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { spendDetailSelector } from "data/atoms/spend";
import { getSpendList3MonthById } from "data/api";
import { settingProperties } from "utils/property";
import DetailInfo from "components/accountBook/DetailInfo";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 5px;
`;
const PreviousButton = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 700;
`;
const Title = styled.span``;
const Content = styled.div``;
// TODO
const RecentHistory = styled.div``;

const Detail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const spendInfo = useRecoilValue(spendDetailSelector({ type, id }));
  const [recentHistory, setRecentHistory] = useState([]);

  const { isLoading, data } = useQuery("getSpendList3MonthById", () =>
    getSpendList3MonthById({
      mainCategory: spendInfo.mainCategory,
      subCategory: spendInfo.subCategory,
    })
  );

  useEffect(() => {
    setRecentHistory(
      data?.results.map((item) => {
        return {
          id: item.id,
          ...settingProperties(item.properties),
        };
      })
    );
  }, [data]);

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <Title>상세내역</Title>
        <div></div>
      </Header>
      <Content>
        <DetailInfo {...spendInfo} />
        {/* TODO */}
        <RecentHistory></RecentHistory>
      </Content>
    </Wrapper>
  );
};

export default Detail;
