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

export const showFriendsInGroup = styled.div`
  font-weight: 600;
  color: orange;
  cursor: pointer;
  margin-left: 20px;
  margin-bottom: 10px;

  :hover {
    color: green;
  }
`;

export const friendWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;
  margin-right: 10px;
`;

export const textWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;

  h4 {
    margin-left: 0px;
  }
`;

export const imageWrapper = styled.div`
  margin: 5px;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const dateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const dateWrapper = styled.div`
  background-color: #66575e;
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
