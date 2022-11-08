import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import FriendList from "../../components/FriendList/FriendList";

const Friends = () => {
  const session = useSession();

  return (
    <GS.Wrapper>
      <Menu session={session} />
      {session ? (
        <GS.Div>
          <FriendList session={session} />
        </GS.Div>
      ) : (
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default Friends;
