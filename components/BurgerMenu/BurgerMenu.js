import React from "react";
import * as S from "./BurgerMenu.styled";
import { bool, func } from "prop-types";
import { useState } from "react";

const BurgerMenu = ({ open, setOpen }) => {
  return (
    <S.StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </S.StyledBurger>
  );
};
BurgerMenu.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default BurgerMenu;
