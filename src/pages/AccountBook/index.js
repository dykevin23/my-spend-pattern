import { Link, Route, Routes, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import Income from "./income";
import Spend from "./spend";
import SpendList from "./spend/SpendList";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 10px;
  gap: 5px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px 0px;
  ${(props) =>
    props.isActive &&
    css`
      font-weight: 600;
      border-bottom: 2px solid ${props.theme.bgColor};
    `}
  a {
    display: block;
  }
`;

const AccountBook = () => {
  const spendMatch = useMatch("/accountBook/spend");
  const incomeMatch = useMatch("/accountBook/income");
  return (
    <>
      {(spendMatch || incomeMatch) && (
        <Tabs>
          <Tab isActive={spendMatch}>
            <Link to="spend">소비</Link>
          </Tab>
          <Tab isActive={incomeMatch}>
            <Link to="income">수입</Link>
          </Tab>
        </Tabs>
      )}

      <Routes>
        <Route path="spend" element={<Spend />} />
        <Route path="income" element={<Income />} />
        <Route path="spend/list" element={<SpendList />} />
      </Routes>
    </>
  );
};

export default AccountBook;
