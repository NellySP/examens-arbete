import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RegisterProfile from "../../components/RegisterProfile/RegisterProfile";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

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
      // router.push("/");
    }
  }
  return (
    <GS.Wrapper>
      <Menu session={session} />
      <HamburgerMenu session={session} open={open} setOpen={setOpen} />

      {session ? (
        <GS.Div>
          <BurgerMenu open={open} setOpen={setOpen} />
          <UpdateProfile />
        </GS.Div>
      ) : (
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default ProfilePage;
