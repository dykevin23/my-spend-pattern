import styled from "styled-components";
import Header from "./Header";

const LayoutDiv = styled.div`
  display: grid;
  gap: 5px;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 9fr;
`;

const Content = styled.div`
  background-color: aqua;
`;

const Layout = ({ children }) => {
  return (
    <LayoutDiv>
      <Header />
      <Content>{children}</Content>
    </LayoutDiv>
  );
};

export default Layout;
