import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useSession } from "@supabase/auth-helpers-react";
import * as GS from "../index.styled";
import * as S from "./index.styled";
import Menu from "../../components/Menu/Menu";
import SearchUser from "../../components/SearchUser/SearchUser";
import { useRouter } from "next/router";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

const SearchFriend = () => {
  const [fetchError, setFetchError] = useState(null);
  const [tests, setTest] = useState(null);
  const user = useUser();
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      setOpen(true);
      const { data, error } = await supabase.from("profiles").select();

      if (error) {
        setFetchError("Something went wrong");
        setTest(null);
        console.log(error);
      }

      if (data) {
        setTest(data);
        setFetchError(null);
      }
    };
    fetchTest();
    reRout();
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
