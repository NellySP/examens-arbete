import styled from "styled-components";

export const StyledBurger = styled.button`
  z-index: 2;
  padding: 20px 10px;
  border: none;
  background-color: #b9c9b7;
  color: white;
  border-radius: 100%;
  position: absolute;
  margin-left: 80%;
  cursor: pointer;
  margin-top: -10px;

  div {
    width: 30px;
    height: 2px;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    margin: 5px;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;
