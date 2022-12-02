import Container from "components/ui/Container";
import Header from "components/ui/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default App;
