import { CostTop5Selector } from "data/atoms/home";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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
const Cost = styled.span``;

const CategoryItem = ({ rank, title, withdraw }) => {
  return (
    <Category>
      <Title>{`${rank}. ${title}`}</Title>
      <Cost>{withdraw} 원</Cost>
    </Category>
  );
};

/**
 * 금액별 TOP5
 * @returns
 */
const CostTop5 = ({ thisMonth }) => {
  const data = useRecoilValue(CostTop5Selector({ thisMonth }));
  return (
    <Wrapper>
      <Header>금액별 TOP5</Header>
      <Content>
        {data?.slice(0, 5).map((item, index) => {
          return <CategoryItem key={item.id} rank={index + 1} {...item} />;
        })}
      </Content>
    </Wrapper>
  );
};

export default CostTop5;
