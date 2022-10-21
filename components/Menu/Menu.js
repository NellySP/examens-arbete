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
      {!session ? (
        <S.MenuWrapper>
          <Link href="/signup">Sign up, step one</Link>
          <Link href="/signupprofile">Sign up, step two</Link>
          <Link href="/login">Startsida</Link>
        </S.MenuWrapper>
      ) : (
        <div>Du är inte inloggad</div>
      )}
    </S.MenuDiv>
  );
};
export default Menu;
