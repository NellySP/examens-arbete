import Calender from "../../components/Calender/Calender";
import Menu from "../../components/Menu/Menu";
import * as S from "./index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Calenderpage = () => {
  const session = useSession();

  return (
    <S.Wrapper>
      <Menu session={session} />
      <S.Div>
        <Calender session={session} />
      </S.Div>
    </S.Wrapper>
  );
};

export default Calenderpage;
