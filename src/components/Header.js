import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderStyled = styled.div`
  background-color: olive;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <div>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
        <Link to="/form">Form</Link>
        <Link to="/charts">Charts</Link>
      </div>
    </HeaderStyled>
  );
};

export default Header;
