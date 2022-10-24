import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";
import Container from "./components/UI/Container";
import Routers from "./Routers";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: ${(props) => props.theme.bgColor}
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Routers />
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
