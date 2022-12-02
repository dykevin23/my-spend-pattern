import { useEffect, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";

const Nav = styled.nav`
  padding: 5px;
`;

const Menus = styled.ul`
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const Menu = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  ${(props) =>
    props.isMatched &&
    css`
      background-color: ${(props) => props.theme.bgColor.sub};
      color: ${(props) => props.theme.bgColor.primary};
      border-radius: 5px;
    `}
`;

const Header = () => {
  const homeMatch = useMatch("/");
  const spendCareMatch = useMatch("/spendCare/*");
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log(location);
    setVisible(!location.pathname.includes("/spendList"));
  }, [location]);
  return visible ? (
    <>
      <Nav>
        <Menus>
          <Link to="/">
            <Menu isMatched={homeMatch}>홈</Menu>
          </Link>

          <Link to="/spendCare">
            <Menu isMatched={spendCareMatch}>소비케어</Menu>
          </Link>
        </Menus>
      </Nav>
      <hr />
    </>
  ) : null;
};

export default Header;
