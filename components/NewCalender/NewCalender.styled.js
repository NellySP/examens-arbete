import styled from "styled-components";

export const calenderDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const calenderSection = styled.section`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const calenderHeading = styled.h1`
  margin: 0px;
`;

export const calenderText = styled.p`
  margin-top: 30px;
  width: 200px;

  @media (min-width: 500px) {
    width: 300px;
  }
`;

export const calenderForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const calenderLabel = styled.label`
  font-weight: 600;
  padding-top: 20px;
`;

export const calenderButton = styled.button`
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

export const h2 = styled.h2`
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-weight: 200;

  @media (min-width: 500px) {
    font-size: 25px;
  }

  @media (min-width: 1000px) {
    font-size: 25px;
  }
`;

// Calenderstyling

export const calenderMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 30px;
  background-color: #b9c9b7;

  @media (min-width: 500px) {
  }

  @media (min-width: 1000px) {
  }
`;

export const calenderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800;

  @media (min-width: 500px) {
  }

  @media (min-width: 1000px) {
  }
`;

export const calenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #f2faf2;

  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    text-align: center;
    background-color: #f2faf2;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
