import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Card from "components/ui/Card";
import { DETAILWAY, MAINCATEGORY, SUBCATEGORY } from "data/enums";
import { getCommonCodeValue } from "utils";
import RecentHistory from "./RecentHistory";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 5px;
`;
const PreviousButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`;
const HTitle = styled.span``;

const Content = styled.div``;
const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 10px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Mark = styled.svg`
  width: 30px;
  height: 30px;
  background-color: #f6e58d;
  border-radius: 180px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Title = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.txtColor.sub};
`;
const Cost = styled.span`
  font-size: 28px;
`;
const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px;
  gap: 30px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.span``;
const Value = styled.span``;

const SpendDetail = () => {
  const navigate = useNavigate();
  const {
    state: { detail },
  } = useLocation();

  console.log(detail);

  const getCategories = ({ mainCategory, subCategory }) => {
    const main = getCommonCodeValue(MAINCATEGORY, mainCategory);
    const sub = getCommonCodeValue(SUBCATEGORY, subCategory);
    return `${main} > ${sub}`;
  };

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <HTitle>상세 내역</HTitle>
        <div />
      </Header>
      <Content>
        <Card>
          <Summary>
            <Info>
              <Mark></Mark>
              <Title>{detail?.title}</Title>
            </Info>
            <Cost>{detail?.withdraw} 원</Cost>
          </Summary>
          <DetailInfo>
            <Row>
              <Label>카테고리</Label>
              <Value>{getCategories(detail)}</Value>
            </Row>
            <Row>
              <Label>결제수단</Label>
              <Value>{getCommonCodeValue(DETAILWAY, detail?.detailWay)}</Value>
            </Row>
            <Row>
              <Label>결제일시</Label>
              <Value>{detail?.date}</Value>
            </Row>
            <Row>
              <Label>사용처</Label>
              <Value>{detail?.store}</Value>
            </Row>
            <Row>
              <Label>지출유형</Label>
              <Value>{detail?.fixType}</Value>
            </Row>
          </DetailInfo>
        </Card>
        <Card>
          <RecentHistory {...detail} />
        </Card>
      </Content>
    </Wrapper>
  );
};

export default SpendDetail;
