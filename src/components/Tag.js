import styled from "styled-components";

const Wrapper = styled.span`
  background-color: ${(props) => (props.isActive ? props.color : "white")};
  color: ${(props) => (props.isActive ? "white" : props.color)};
  border-color: black;
  border: 1px solid;
  border-radius: 20px;
  padding: 7px;
  margin: 5px;
`;

const Tag = ({ name, color, isActive = false, onClick }) => {
  return (
    <Wrapper color={color} isActive={isActive} onClick={onClick}>
      {name}
    </Wrapper>
  );
};

export default Tag;
