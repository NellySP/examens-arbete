import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";

const ProfilePage = () => {
  const session = useSession();
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
