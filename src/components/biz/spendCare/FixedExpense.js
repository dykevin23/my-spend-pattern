import { payMethodListSelector } from "data/atoms/spend";
import { FIXTYPE, MAINCATEGORY } from "data/enums";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 5px;
`;
const OverviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const OverviewTitle = styled.span`
  font-size: 22px;
`;
const TotalCost = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const FixedList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;
const Category = styled.li``;
const CategoryName = styled.span``;
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;
const FixedItem = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  gap: 10px;
`;
const ItemMark = styled.svg`
  width: 40px;
  height: 40px;
  background-color: #74b9ff;
  border-radius: 100%;
  margin-right: 10px;
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
const Cost = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const ExpenseDate = styled.span`
  font-size: 14px;
`;

const FixedExpense = () => {
  const [today, month] = useOutletContext();
  const navigate = useNavigate();
  const payMethodList = useRecoilValue(payMethodListSelector);
  const [fixedExpense, setFixedExpense] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (payMethodList[month]) {
      const spendList = Object.values(payMethodList[month])
        .map((item) => item.data)
        .flat()
        .filter((item) => item.fixType === "fix");

      const mainCategoryArr = [
        ...new Set(spendList.map((item) => item.mainCategory)),
      ];

      let obj = {};
      mainCategoryArr.forEach((key) => {
        obj[key] = spendList.filter((item) => item.mainCategory === key);
      });

      setFixedExpense(obj);
      setTotalPrice(
        spendList
          .map((item) => item.withdraw)
          .reduce((a, b) => Number(a) + Number(b), [])
      );
    }
  }, [payMethodList, month]);

  const getExpenseDate = (data) => {
    const date = new Date(data);
    return date.getDate();
  };

  const handleSpendCardClick = (item) => {
    navigate(`/spendCare/spendDetail/${item?.id}`, { state: { detail: item } });
  };

  return (
    <Wrapper>
      <OverviewInfo>
        <OverviewTitle>매달 나가는 돈</OverviewTitle>
        <TotalCost>총 {totalPrice} 원</TotalCost>
      </OverviewInfo>
      {fixedExpense ? (
        <FixedList>
          {Object.keys(fixedExpense).map((key) => {
            return (
              <Category key={key}>
                <CategoryName>
                  {MAINCATEGORY.find((item) => item.code === key).value}
                </CategoryName>
                <ItemList>
                  {fixedExpense[key].map((item, index) => {
                    return (
                      <FixedItem
                        key={index}
                        onClick={() => handleSpendCardClick(item)}
                      >
                        <ItemMark></ItemMark>
                        <ItemInfo>
                          <Title>{item?.title}</Title>
                          <Cost>{item.withdraw} 원</Cost>
                        </ItemInfo>
                        <ExpenseDate>
                          {getExpenseDate(item.date)} 일 완료
                        </ExpenseDate>
                      </FixedItem>
                    );
                  })}
                </ItemList>
              </Category>
            );
          })}
        </FixedList>
      ) : null}
    </Wrapper>
  );
};

export default FixedExpense;
