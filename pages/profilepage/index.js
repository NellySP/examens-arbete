import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
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
      {session ? (
        <GS.Div>
          <UpdateProfile />
        </GS.Div>
      ) : (
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default ProfilePage;
