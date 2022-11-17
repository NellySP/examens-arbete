import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import Calender from "../../components/Calender/Calender";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";

const Calenderpage = () => {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reRout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Calender session={session} />
        </GS.Div>
      ) : (
        // It should not get here, but it's a backup
        <></>
      )}
    </GS.Wrapper>
  );
};

export default Calenderpage;
