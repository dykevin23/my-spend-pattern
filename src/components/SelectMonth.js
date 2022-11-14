import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Month = styled.span``;
const SelectButton = styled.span``;

const SelectMonth = ({ today, month, setMonth, type = "" }) => {
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
    setMonth((prevState) => {
      const [prevMonth, prevYear] = prevState.month;
      const calResult = prevMonth + option;
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
