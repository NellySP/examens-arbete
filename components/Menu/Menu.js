import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./Menu.styled";
import Link from "next/link";
import { useEffect } from "react";

const Menu = ({ session }) => {
  const supabase = useSupabaseClient();
  useEffect(() => {}, [session]);

  console.log(session);

  return (
    <S.MenuDiv>
      {session ? (
        <S.MenuWrapper>
          <S.LinkWrapper>
            <Link href="/actualhome">Startsida</Link>
            <Link href="/calenderpage">Kalender</Link>
            <Link href="/friends">Vänlista</Link>
          </S.LinkWrapper>
          <div>
            <S.LogOutButton
              className="button block"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Sign Out
            </S.LogOutButton>
          </div>
        </S.MenuWrapper>
      ) : (
        <S.MenuWrapper>
          <p>Du är inte inloggad</p>
        </S.MenuWrapper>
      )}
    </S.MenuDiv>
  );
};
export default Menu;
