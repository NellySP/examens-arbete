import styled from "styled-components";

// General styling for all pages

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #b9c9b7;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  /* background: linear-gradient(
    331deg,
    rgba(237, 244, 157, 1) 0%,
    rgba(100, 150, 100, 1) 46%,
    rgba(154, 186, 157, 1) 87%,
    rgba(182, 196, 186, 1) 100%
  ); */
  background-color: black;
  background-color: #b9c9b7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`;

export const loginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

export const header = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("/test7.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  min-height: 100vh;
  border-radius: 10px;
  padding: 100px 0px;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const LoginDiv = styled.div`
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  width: 80%;
  border-radius: 10px;
  height: 400px;
  background-color: white;

  button {
    background-color: black;
    border-color: black;
  }

  button:hover {
    background-color: black;
  }

  @media (min-width: 500px) {
    padding: 40px;
    margin: 50px;
    width: 70%;
  }

  @media (min-width: 1000px) {
    padding: 40px;
    margin: 50px;
    width: 40%;
  }
`;

export const contentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const infoDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  background-color: white;
  padding: 10px;
  margin: 10px;
  width: 80%;
  border-radius: 10px;
  height: 400px;

  p {
    margin-top: 10px;
  }

  h1 {
    font-family: var(--railway);
    font-weight: 500;
  }
  @media (min-width: 500px) {
    margin: 50px;
    width: 70%;
  }

  @media (min-width: 1000px) {
    margin: 50px;
    width: 40%;
    padding: 50px;
  }
`;

export const imgDiv = styled.div`
  width: 70px;
  height: 70px;
  align-self: center;
`;
