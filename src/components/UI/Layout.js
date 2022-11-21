import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  gap: 5px;
  height: 100vh;
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
