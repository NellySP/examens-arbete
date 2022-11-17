import styled from "styled-components";

export const p = styled.p`
  font-weight: 600;
  color: orange;
  cursor: pointer;

  :hover {
    color: green;
  }
`;

export const addFriendDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 60px;
  border-radius: 20%;
  background-color: white;
`;

export const addFriendSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1200px) {
    flex-direction: row;
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b9c9b7;
  border-radius: 10px;
  padding: 10px;
  width: 100%;

  @media (min-width: 1200px) {
    width: 50%;
  }
`;

export const wrapperImageDiv = styled.div`
  background-color: #f7f7f5;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1200px) {
    margin: 20px;
  }
`;

export const wrapperDiv = styled.div`
  background-color: #f7f7f5;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  @media (min-width: 1200px) {
    margin: 20px;
  }
`;

export const addFriendText = styled.p`
  margin-top: 00px;
  width: 100%;

  @media (min-width: 500px) {
  }
`;

export const addFriendForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const addFriendInput = styled.input`
  margin-top: 10px;
  height: 30px;
  width: 100%;

  @media (min-width: 500px) {
  }
`;

export const addFriendFileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;
export const imagePreview = styled.div`
  width: 100%;
  margin-top: 10%;
  margin-bottom: 10%;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const addFriendFileLabel = styled.label`
  background-color: transparent;
  color: orange;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  font-weight: 500;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;

  :hover {
    color: green;
  }
`;

export const addFriendLabel = styled.label`
  font-weight: 600;
  padding-top: 20px;
`;

export const addFriendButton = styled.button`
  color: white;
  background-color: ${(props) => props.inputColor || "#b9c9b7"};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border-style: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  align-self: center;
  :hover {
    background-color: #47594c;
  }
`;

export const imageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    object-fit: cover;
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
  p:first-of-type {
    font-weight: 600px;
    margin: 0px;
  }

  @media (min-width: 800px) {
    p {
      font-size: 16px;
    }
  }
`;

export const profileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-top: 10px;

  @media (min-width: 800px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export const groupWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 800px) {
    margin-bottom: 0px;
  }
`;
