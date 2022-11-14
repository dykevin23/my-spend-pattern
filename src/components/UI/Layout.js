import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  display: grid;
  gap: 5px;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 9fr;
`;

const Content = styled.div`
  background-color: #ecf0f1;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
