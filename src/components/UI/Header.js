import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderStyled = styled.div`
  background-color: olive;
  display: flex;
  gap: 5px;
  height: 30px;
  justify-content: right;
  padding-right: 5px;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Link to="/form">Form</Link>
      <Link to="/charts">Charts</Link>
    </HeaderStyled>
  );
};

export default Header;
