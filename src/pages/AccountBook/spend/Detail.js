import { spendDetailSelector } from "data/atoms/spend";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getSpendList3MonthById } from "data/api";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { settingProperties } from "utils/property";
import { useState } from "react";

const Wrapper = styled.div``;
const Header = styled.div``;
const Content = styled.div``;
const DetailInfo = styled.div``;

// TODO
const RecentHistory = styled.div``;

const Detail = () => {
  const { type, id } = useParams();
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
      <Header></Header>
      <Content>
        <DetailInfo></DetailInfo>
        {/* TODO */}
        <RecentHistory></RecentHistory>
      </Content>
    </Wrapper>
  );
};

export default Detail;
