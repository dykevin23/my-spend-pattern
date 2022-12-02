import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 10px;
  gap: 5px;
`;

const Tabs = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const TabPane = styled.span`
  text-align: center;
  text-transform: uppercase;
  padding: 5px 0px;
  font-weight: 300;
  ${(props) =>
    props.isActive &&
    css`
      font-weight: 500;
      border-bottom: 2px solid ${props.theme.txtColor.primary};
    `}
  a {
    display: block;
  }
`;
export const Tab = ({ children, isActive }) => {
  return <TabPane isActive={isActive}>{children}</TabPane>;
};

export default Tabs;
