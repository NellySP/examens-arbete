import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import FriendList from "../../components/FriendList/FriendList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

const Friends = () => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <FriendList session={session} />
        </GS.Div>
      ) : (
        // It should not get here, but it's a backup
        <></>
      )}
    </GS.Wrapper>
  );
};

export default Friends;
