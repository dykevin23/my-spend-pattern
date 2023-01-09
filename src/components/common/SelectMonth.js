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
  const [isPrevDisabled, setIsPrevDisabled] = useState(month === "202209");
  const [isNextDisabled, setIsNextDisabled] = useState(
    new Date(today).getMonth() + 1 === Number(month.slice(4))
  );

  useEffect(() => {
    setIsPrevDisabled(month === "202209");
    setIsNextDisabled(
      new Date(today).getMonth() + 1 === Number(month.slice(4))
    );
  }, [month, today]);

  const getMonth = (date, today) => {
    const year = date.slice(0, 4);
    const month = Number(date.slice(4));

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

  const handleMonth = (option) => {
    setMonth((prevState) => {
      const date = prevState.month;
      const prevYear = Number(date.slice(0, 4));
      const prevMonth = Number(date.slice(4));
      const calResult = prevMonth + option;

      const nextYear =
        calResult < 1 ? prevYear - 1 : calResult > 12 ? prevYear + 1 : prevYear;
      const nextMonth =
        calResult < 1
          ? 12
          : calResult > 12
          ? `01`
          : calResult < 10
          ? `0${calResult}`
          : calResult;

      return {
        ...prevState,
        month: `${nextYear}${nextMonth}`,
      };
    });
  };

  return (
    <Wrapper>
      <SelectButton onClick={() => !isPrevDisabled && handleMonth(-1)}>
        {isPrevDisabled ? "◁" : "◀︎"}
      </SelectButton>
      <Month>{getMonth(month, today)}</Month>
      <SelectButton onClick={() => !isNextDisabled && handleMonth(+1)}>
        {isNextDisabled ? "▷" : "▶︎"}
      </SelectButton>
    </Wrapper>
  );
};

export default SelectMonth;
