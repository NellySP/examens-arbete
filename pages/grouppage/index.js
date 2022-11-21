import Menu from "../../components/Menu/Menu";
import * as GS from "../../styles/index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import CreateGroups from "../../components/CreateGroup/CreateGroup";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
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
          <CreateGroups session={session} />
        </GS.Div>
      ) : (
        <></>
      )}
    </GS.Wrapper>
  );
};

export default ProfilePage;
