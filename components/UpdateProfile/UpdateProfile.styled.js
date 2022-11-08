import styled from "styled-components";

export const signUpDiv = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  border-radius: 20%;
`;

export const signUpSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 60px;
  border-radius: 20%;
`;

export const signUpHeading = styled.h1`
  margin: 0px;
`;

export const signUpText = styled.p`
  margin-top: 30px;
  width: 200px;

  @media (min-width: 500px) {
    width: 300px;
  }
`;

export const signUpForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const signUpInput = styled.input`
  margin-top: 10px;
  height: 30px;
  width: 200px;

  @media (min-width: 500px) {
    width: 300px;
  }
`;

export const signUpLabel = styled.label`
  font-weight: 600;
  padding-top: 20px;
`;

export const signUpButton = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  font-weight: 500;
  font-size: 14px;
  margin-top: 20px;
`;
