import styled from "styled-components";

export const updateProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 40px;
  border-radius: 20%;
  background-color: white;
`;

export const updateProfileSection = styled.section`
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

export const updateProfileText = styled.p`
  margin-top: 00px;
  width: 100%;

  @media (min-width: 500px) {
  }
`;

export const updateProfileForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const updateProfileInput = styled.input`
  margin-top: 10px;
  height: 30px;
  width: 100%;

  @media (min-width: 500px) {
  }
`;

export const updateProfileFileInput = styled.input`
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

export const updateProfileFileLabel = styled.label`
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

export const updateProfileLabel = styled.label`
  font-weight: 600;
  padding-top: 20px;
`;

export const updateProfileButton = styled.button`
  background-color: ${(props) => props.inputColor || "#47594c"};
  width: ${(props) => props.inputWidth};
  color: white;
  padding: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  font-weight: 500;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
`;
