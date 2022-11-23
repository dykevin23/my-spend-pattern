import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { spendDetailSelector } from "data/atoms/spend";
import DetailInfo from "components/accountBook/DetailInfo";
import RecentSpendHistory from "components/accountBook/RecentSpendHistory";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
`;
const PreviousButton = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 700;
`;
const Title = styled.span``;
const Content = styled.div``;

const Detail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const spendInfo = useRecoilValue(spendDetailSelector({ type, id }));

  return (
    <Wrapper>
      <Header>
        <PreviousButton onClick={() => navigate(-1)}>{"<"}</PreviousButton>
        <Title>상세내역</Title>
        <div></div>
      </Header>
      <Content>
        <DetailInfo {...spendInfo} />
        <RecentSpendHistory
          mainCategory={spendInfo.mainCategory}
          subCategory={spendInfo.subCategory}
          store={spendInfo.store}
        />
      </Content>
    </Wrapper>
  );
};

export default Detail;
