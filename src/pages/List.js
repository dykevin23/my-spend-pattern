import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getExpenditureList } from "../data/api";
import { expenditureListAtom } from "../data/atoms";

import Card from "../components/Card";
import { settingProperties } from "../utils/property";

const CardList = styled.ul``;

const List = () => {
  const [expenditureList, setExpenditureList] =
    useRecoilState(expenditureListAtom);
  const { isLoading, data } = useQuery("allExpenditures", getExpenditureList);

  useEffect(() => {
    console.log("### update");
    setExpenditureList(
      data?.results.map((item) => {
        return {
          id: item.id,
          ...settingProperties(item.properties),
        };
      })
    );
  }, [data]);

  // type
  // date, created_time, select, rich_text, title
  // number
  console.log(expenditureList);
  return (
    <CardList>
      {isLoading
        ? "Loading ..."
        : expenditureList?.map((card) => {
            return <Card key={card.id} {...card} />;
          })}
    </CardList>
  );
};

export default List;
