import styled from "styled-components";

export const dateDisplayDiv = styled.div`
  padding: 40px;
`;

export const SearchFriendWrapper = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 50px;

  form button {
    color: white;
    border-radius: 5px;
    border-color: #47594c;
    width: 70px;
    border-style: none;
    height: 30px;
    margin-left: 20px;
    cursor: pointer;

    @media (min-width: 800px) {
      width: 100px;
      height: 40px;
    }
  }

  input {
    height: 30px;
    border: 2px solid gray;
    border-radius: 5px;
    width: 63%;

    @media (min-width: 800px) {
      width: 40%;
      height: 40px;
    }
  }
  input:focus {
    outline: none;
    border: 3px solid #47594c;
  }
`;

export const FriendDiv = styled.div`
  background-color: #e1ecdf;
  background-color: #f5f3f0;
  background-color: #f7f7f5;
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

  button {
    background-color: #47594c;
    color: white;
    border-radius: 5px;
    border-color: #47594c;
    width: 100px;
    border-style: none;
    height: 40px;

    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (min-width: 800px) {
    flex-direction: row;

    button {
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 20px;
    }
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
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;
