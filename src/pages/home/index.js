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
import { getMonth, getYear } from "utils";

const Wrapper = styled.div``;
const Content = styled.div``;

const Home = () => {
  const [thisMonth] = useState(`${getYear()}${getMonth()}`);
  const setSpendList = useSetRecoilState(spendListAtom);
  const { isLoading, data } = useQuery("getSpendList", () =>
    getSpendList({ month: thisMonth })
  );

  useEffect(() => {
    setSpendList((prevState) => {
      return {
        ...prevState,
        [thisMonth]:
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
          <SpendSummary thisMonth={thisMonth} />
        </Card>
        <Card>
          <CategoryTop5 thisMonth={thisMonth} />
        </Card>
        <Card>
          <FavoritesTop5 thisMonth={thisMonth} />
        </Card>
        <Card>
          <CostTop5 thisMonth={thisMonth} />
        </Card>
      </Content>
    </Wrapper>
  );
};

export default Home;
