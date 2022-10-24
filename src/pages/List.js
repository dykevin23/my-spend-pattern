import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getExpenditureList } from "../api";
import { expenditureListAtom } from "../atoms";

import Card from "../components/Card";

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

  const settingProperties = (properties) => {
    const keys = Object.keys(properties);
    let result = {};
    keys
      .filter((key) => key !== "key")
      .forEach((key) => {
        const { type } = properties[key];
        result[key] = properties[key][type];
      });

    return result;
  };

  console.log(expenditureList);

  console.log(data);
  return (
    <CardList>
      {isLoading
        ? "Loading ..."
        : expenditureList.map((card) => {
            return <Card key={card.id} {...card} />;
          })}
    </CardList>
  );
};

export default List;
