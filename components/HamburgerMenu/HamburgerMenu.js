import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./HamburgerMenu.styled";
import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";
import { bool } from "prop-types";

const HamburgerMenu = ({ session, open }) => {
  const supabase = useSupabaseClient();

  useEffect(() => {});

  return (
    <S.StyledMenu open={open}>
      <S.LinkWrapper>
        <Link href="/">Gemensamma datum</Link>
        <Link href="/calenderpage">Kalender</Link>
        <Link href="/searchfriend">Sök användare</Link>
        <Link href="/friends">Vänlista</Link>
        <Link href="/profilepage"> Ändra profil</Link>
        <Link href="/grouppage"> Grupper</Link>
      </S.LinkWrapper>
    </S.StyledMenu>
  );
};
HamburgerMenu.propTypes = {
  open: bool.isRequired,
};
export default HamburgerMenu;
