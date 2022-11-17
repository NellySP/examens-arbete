import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./HamburgerMenu.styled";
import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";
import { bool } from "prop-types";

const HamburgerMenu = ({ session, open }) => {
  const supabase = useSupabaseClient();

  useEffect(() => {}, [session]);

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
      <div>
        <S.LogOutButton
          className="button block"
          onClick={() => {
            supabase.auth.signOut();
            Router.push("/");
          }}
        >
          Logga ut
        </S.LogOutButton>
      </div>
    </S.StyledMenu>
  );
};
HamburgerMenu.propTypes = {
  open: bool.isRequired,
};
export default HamburgerMenu;
