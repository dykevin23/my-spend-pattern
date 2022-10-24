import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  gap: 5px;
  height: 30px;
  justify-content: right;
  align-items: center;
  .active {
    color: red;
  }
`;

const Header = () => {
  const { pathname } = useLocation();

  return (
    <StyledHeader>
      <Link className={pathname === "/" ? "active" : ""} to="/">
        Home
      </Link>
      <Link className={pathname === "/list" ? "active" : ""} to="/list">
        List
      </Link>
      <Link className={pathname === "/form" ? "active" : ""} to="/form">
        Form
      </Link>
      <Link className={pathname === "/charts" ? "active" : ""} to="/charts">
        Charts
      </Link>
    </StyledHeader>
  );
};

export default Header;
