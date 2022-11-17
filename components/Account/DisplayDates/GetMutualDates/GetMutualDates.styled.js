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
  flex-direction: row;
  width: 100%;
`;

export const imageWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const textWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;

  p {
    margin: 0px;
  }
`;

export const dateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const p = styled.div`
  background-color: #b59e8f;
  background-color: #6e5a4e;
  background-color: #665c57;
  background-color: #665757;
  color: white;
  margin: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
`;
