import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import FriendList from "../../components/FriendList/FriendList";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Friends = () => {
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
          <FriendList session={session} />
        </GS.Div>
      ) : (
        // It should not get here, but it's a backup
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default Friends;
