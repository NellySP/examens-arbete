import Menu from "../../components/Menu/Menu";
import * as S from "./index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Friends = () => {
  const session = useSession();

  return (
    <S.Wrapper>
      <Menu session={session} />
      <h1>Friends! :D</h1>
    </S.Wrapper>
  );
};

export default Friends;
