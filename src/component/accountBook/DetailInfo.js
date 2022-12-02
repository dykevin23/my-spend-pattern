import { DETAILWAY, MAINCATEGORY, SUBCATEGORY } from "data/enums";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
`;
const Overview = styled.div`
  padding-top: 40px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const OverviewTop = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const OverviewContent = styled.div`
  font-size: 30px;
`;
const OverviewMark = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #a29bfe;
`;
const OverviewStore = styled.span``;

const Info = styled.div`
  padding: 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
`;
const Label = styled.span`
  font-size: 20px;
  color: #34495e;
`;
const Value = styled.span`
  font-size: 18px;
  color: #34495e;
`;

const DetailInfo = (props) => {
  const { mainCategory, subCategory, withdraw, title, detailWay, store, date } =
    props;
  return (
    <Wrapper>
      <Overview>
        <OverviewTop>
          <OverviewMark></OverviewMark>
          <OverviewStore>{store}</OverviewStore>
        </OverviewTop>
        <OverviewContent>{`-${withdraw} 원`}</OverviewContent>
      </Overview>
      <Info>
        <Row>
          <Label>카테고리</Label>
          <Value>
            {MAINCATEGORY.find((item) => item.code === mainCategory).value}
          </Value>
        </Row>
        <Row>
          <Label>상세 카테고리</Label>
          <Value>
            {SUBCATEGORY.find((item) => item.code === subCategory).value}
          </Value>
        </Row>
        <Row>
          <Label>메모</Label>
          <Value>{title}</Value>
        </Row>
        <Row>
          <Label>결제수단</Label>
          <Value>
            {DETAILWAY.find((item) => item.code === detailWay).value}
          </Value>
        </Row>
        <Row>
          <Label>결제일</Label>
          <Value>{date}</Value>
        </Row>
        <Row>
          <Label>사용처</Label>
          <Value>{store}</Value>
        </Row>
      </Info>
    </Wrapper>
  );
};

export default DetailInfo;
