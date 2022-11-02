import styled from "styled-components";

// General styling for all pages

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #b9c9b7;
  height: 100%;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
`;

export const Div = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  margin: 50px;
  width: 100%;
  border-radius: 10px;
`;

export const LoginWrapper = styled.div`
  background-color: #b9c9b7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 40px;
  margin: 50px;
  width: 30%;
  border-radius: 10px;
  height: 300px;
`;
