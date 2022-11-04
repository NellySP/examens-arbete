import styled from "styled-components";

export const MenuDiv = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: block;
    background-color: white;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 50px;
    border-radius: 10px;
    height: 700px;
    position: fixed;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 700px;
  padding: 60px;
  font-size: 20px;
  width: 270px;

  a {
    padding-top: 20px;
    font-family: var(--railway);
    font-weight: 500;
  }
  a:hover {
    color: #47594c;
    text-decoration: underline;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogOutButton = styled.button`
  background-color: #47594c;
  background-color: black;
  background-color: #47594c;
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
  width: 150px;
  cursor: pointer;
`;
