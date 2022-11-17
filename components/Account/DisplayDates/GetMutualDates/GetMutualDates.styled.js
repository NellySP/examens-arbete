import styled from "styled-components";

export const dateDiv = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #f7f7f5;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const userWrapper = styled.div`
  display: flex;
  flex-direction: space-between;
  width: 100%;
`;

export const imageWrapper = styled.div`
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const p = styled.div`
  background-color: #47594c;
  color: white;
  margin: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
`;
