import Menu from "../../components/Menu/Menu";
import * as S from "./index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Friends = () => {
  const session = useSession();

  return (
    <S.Wrapper>
      <Menu session={session} />
      <S.Div>
        <h1>This is friends (and an ugly color)</h1>
      </S.Div>
    </S.Wrapper>
  );
};

export default Friends;
