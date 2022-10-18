import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import Card from "../components/Card";
import Container from "../components/UI/Container";

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

  return <div>List</div>;
};

export default List;
