import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import Card from "../components/Card";
import Box from "../components/UI/Box";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiCall();
  });

  const apiCall = useCallback(async () => {
    console.log("### my-spend-pattern app start => ", list);

    if (list.length === 0) {
      const resposne = await (await fetch("/list")).json();
      console.log("### response => ", resposne);
      setList(resposne.results);
    }
  }, [list]);

  const SortingBar = styled.div``;

  return (
    <Box>
      <SortingBar></SortingBar>
      {list.map((item) => {
        return <Card {...item} />;
      })}
    </Box>
  );
};

export default List;
