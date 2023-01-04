import CategoryTop5 from "components/biz/home/CategoryTop5";
import CostTop5 from "components/biz/home/CostTop5";
import FavoritesTop5 from "components/biz/home/FavoritesTop5";
import RecentSpend from "components/biz/home/RecentSpend";
import SpendSummary from "components/biz/home/SpendSummary";
import Card from "components/ui/Card";
import Header from "components/ui/Header";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getSpendList } from "api/spend";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { spendListAtom } from "data/atoms/spend";
import { useEffect } from "react";
import { settingProperties } from "utils/property";
import { useState } from "react";
import { defaultMonthAtom } from "data/atoms/common";
import { getMonth, getYear } from "utils";

const Wrapper = styled.div``;
const Content = styled.div``;

const Home = () => {
  const defaultMonth = useRecoilValue(defaultMonthAtom);
  const [thisMonth] = useState([getMonth(), getYear()]);
  const setSpendList = useSetRecoilState(spendListAtom);
  const { isLoading, data } = useQuery("getSpendList", () =>
    getSpendList({ month: thisMonth })
  );

  useEffect(() => {
    setSpendList((prevState) => {
      return {
        ...prevState,
        [[...thisMonth].reverse().join("")]:
          data?.results
            ?.map((item) => {
              return {
                id: item.id,
                ...settingProperties(item.properties),
              };
            })
            .filter((item) => item.mainCategory) || [],
      };
    });
  }, [data]);

  return (
    <Wrapper>
      <Header />
      <Content>
        <Card>
          <SpendSummary />
        </Card>
        <Card>
          <CategoryTop5 />
        </Card>
        <Card>
          <FavoritesTop5 />
        </Card>
        <Card>
          <CostTop5 />
        </Card>
        {/* <Card>
          <SpendSummary />
        </Card>
        <Card>
          <CategoryTop5 />
        </Card>
        <Card>
          <FavoritesTop5 />
        </Card>
        <Card>
          <CostTop5 />
        </Card>
        <Card>
          <RecentSpend />
        </Card> */}
      </Content>
    </Wrapper>
  );
};

export default Home;
