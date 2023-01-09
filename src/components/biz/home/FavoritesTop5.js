import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { favoritesTop5Selector } from "data/atoms/home";
import { MAINCATEGORY } from "data/enums";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 60%;
`;
const Title = styled.span`
  font-size: 18px;
`;
const Percent = styled.span`
  /* width: 150px; */
  font-size: 14px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const Count = styled.span``;

const CategoryItem = ({ rank, totalCount, category, count }) => {
  const [categoryName] = useState(
    MAINCATEGORY.find((item) => item.code === category).value
  );

  return (
    <Category>
      <Info>
        <Title>{`${rank}. ${categoryName}`}</Title>
        <Percent>{`${Math.round((count / totalCount) * 100)}%`}</Percent>
      </Info>
      <Count>{count} 회</Count>
    </Category>
  );
};

/**
 * 자주사용하는 분류(카테고리) TOP5
 * @returns
 */
const FavoritesTop5 = ({ thisMonth }) => {
  const data = useRecoilValue(favoritesTop5Selector({ thisMonth }));
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setTotalCount(
        data
          .map((item) => item.count)
          .reduce((a, b) => Number(a) + Number(b), [])
      );
    }
  }, [data]);

  return (
    <Wrapper>
      <Header>자주 사용하는 분류 TOP5</Header>
      <Content>
        {data?.slice(0, 5).map((item, index) => {
          return (
            <CategoryItem
              key={index}
              rank={index + 1}
              totalCount={totalCount}
              {...item}
            />
          );
        })}
      </Content>
    </Wrapper>
  );
};

export default FavoritesTop5;
