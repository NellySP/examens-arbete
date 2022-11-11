import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const showFriendsWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

export const showFriendsWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 800px) {
    margin-bottom: 0px;
  }
`;

export const imageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    object-fit: cover;
    justify-self: center;
  }

  @media (min-width: 800px) {
    margin-bottom: 0px;
  }
`;

export const textWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  margin: 0px;
  margin-left: 20px;

  p {
    margin: 0px;
    font-size: 12px;
  }

  @media (min-width: 800px) {
    p {
      font-size: 16px;
    }
  }
`;

export const showFriendsButton = styled.button`
  background-color: ${(props) => props.inputColor || "#47594c"};
  width: ${(props) => props.inputWidth};
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  padding: 15px;
  font-weight: 500;
  font-size: 14px;

  cursor: pointer;
`;
