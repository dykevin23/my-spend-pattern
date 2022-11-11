import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { spendSearchConditionAtom } from "../data/atoms/spend";

const Wrapper = styled.div`
  display: flex;
  padding-top: 20px;
  padding-left: 20px;
  gap: 20px;
`;
const Month = styled.span``;
const SelectButton = styled.span``;

const SelectMonth = ({ today, month, type = "" }) => {
  const setSearchCondition = useSetRecoilState(spendSearchConditionAtom);
  const [isPrevDisabled, setIsPrevDisabled] = useState(
    month[0] === 9 && month[1] === 2022
  );
  const [isNextDisabled, setIsNextDisabled] = useState(
    new Date(today).getMonth() + 1 === month[0]
  );

  useEffect(() => {
    setIsPrevDisabled(month[0] === 9 && month[1] === 2022);
    setIsNextDisabled(new Date(today).getMonth() + 1 === month[0]);
  }, [month, today]);

  const getMonth = (months, today) => {
    const [month, year] = months;
    const getYear = (selectYear, todayYear) => {
      return selectYear === todayYear ? "" : `${(selectYear + "").slice(2)}년`;
    };

    const yearText = getYear(year, new Date(today).getFullYear());
    if (type !== "") {
      if (type === "spend") return `${yearText} ${month}월 소비`;
      else if (type === "income") return `${yearText} ${month}월 수입`;
    } else {
      return `${yearText} ${month}월`;
    }
  };

  const handleMonth = (month, option) => {
    setSearchCondition((prevState) => {
      const [prevMonth, prevYear] = prevState.month;
      const calResult = prevMonth + option;
      console.log(prevState, month, month[0] + option);
      return {
        ...prevState,
        month: [
          calResult < 1 ? 12 : calResult > 12 ? 1 : calResult,
          calResult < 1
            ? prevYear - 1
            : calResult > 12
            ? prevYear + 1
            : prevYear,
        ],
      };
    });
  };

  return (
    <Wrapper>
      <SelectButton onClick={() => !isPrevDisabled && handleMonth(month, -1)}>
        {isPrevDisabled ? "◁" : "◀︎"}
      </SelectButton>
      <Month>{getMonth(month, today)}</Month>
      <SelectButton onClick={() => !isNextDisabled && handleMonth(month, +1)}>
        {isNextDisabled ? "▷" : "▶︎"}
      </SelectButton>
    </Wrapper>
  );
};

export default SelectMonth;
