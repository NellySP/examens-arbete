import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #f7f7f5;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  h4 {
    margin-left: 20px;
  }
`;

export const showFriendsInGroup = styled.p`
  font-weight: 600;
  color: orange;
  cursor: pointer;

  :hover {
    color: green;
  }
`;
