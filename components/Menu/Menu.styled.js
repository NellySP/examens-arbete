import styled from "styled-components";

export const MenuDiv = styled.div`
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 50px;
  border-radius: 10px;
  position: sticky;
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 550px;
  padding: 80px;
  font-size: 20px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogOutButton = styled.button`
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
  width: 100px;
  cursor: pointer;
`;
