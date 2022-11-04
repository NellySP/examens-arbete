import styled from "styled-components";

export const SearchFriendWrapper = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 50px;

  form button {
    background-color: black;
    color: white;
    border-radius: 5px;
    border-color: black;
    width: 100px;
    border-style: none;
    height: 50px;
    margin-left: 20px;
    cursor: pointer;
  }

  input {
    height: 50px;
    border: 2px solid gray;
    border-radius: 5px;
  }
  input:focus {
    outline: none;
    border: 4px solid #47594c;
  }
`;

export const FriendDiv = styled.div`
  background-color: #e1ecdf;
  background-color: #f5f3f0;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const profileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const textWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;

  @media (min-width: 800px) {
    align-items: flex-start;
    margin-left: 40px;
  }

  p:first-of-type {
    font-family: var(--railway);
    font-weight: 600;
    font-size: 18px;
    padding: 0px;
    margin: 0px;
  }
  p:last-of-type {
    padding: 0px;
    margin: 0px;
  }
`;

export const imageWrapper = styled.div`
  border-radius: 50%;
`;
