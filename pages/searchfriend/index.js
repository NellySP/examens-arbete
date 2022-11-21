import { useState, useEffect } from "react";
import { useUser, useSession } from "@supabase/auth-helpers-react";
import * as S from "../../styles/searchfriendPage.styled";
import * as GS from "../../styles/index.styled";
import Menu from "../../components/Menu/Menu";
import SearchUser from "../../components/SearchUser/SearchUser";
import { useRouter } from "next/router";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

const SearchFriend = () => {
  const user = useUser();
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reRout();

    setOpen(true);
  }, [session]);

  function reRout() {
    if (!session) {
      router.push("/");
    }
  }
  return (
    <GS.Wrapper>
      <Menu session={session} />
      <HamburgerMenu session={session} open={open} setOpen={setOpen} />

      {session ? (
        <GS.Div>
          <BurgerMenu open={open} setOpen={setOpen} />
          <S.searchfieldWrapper>
            <h2>Sök användare</h2>
            Här kan du söka på andra användare. Du kan söka både via namn och
            användarnamn.
            <SearchUser session={session} />
          </S.searchfieldWrapper>
        </GS.Div>
      ) : (
        // It should not get here, but it's a backup
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default SearchFriend;
