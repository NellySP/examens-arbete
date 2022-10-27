import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Friends = () => {
  const session = useSession();

  return (
    <GS.Wrapper>
      <Menu session={session} />
      <GS.Div>
        <h1>This is friends (and an ugly color)</h1>
      </GS.Div>
    </GS.Wrapper>
  );
};

export default Friends;
