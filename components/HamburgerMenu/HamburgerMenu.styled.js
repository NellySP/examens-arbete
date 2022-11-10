import styled from "styled-components";

export const StyledMenu = styled.nav`
  z-index: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  display: ${({ open }) => (open ? "none" : "block")};

  @media (min-width: 1000px) {
    display: none;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
