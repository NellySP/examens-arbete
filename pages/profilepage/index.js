import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";

const ProfilePage = () => {
  return (
    <GS.Wrapper>
      <Menu />
      <GS.Div>
        <UpdateProfile />
      </GS.Div>
    </GS.Wrapper>
  );
};

export default ProfilePage;
