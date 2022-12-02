import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
`;

const Card = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Card;
