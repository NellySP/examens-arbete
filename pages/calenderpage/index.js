import Calender from "../../components/Calender/Calender";
import Menu from "../../components/Menu/Menu";
import * as S from "./index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Calenderpage = () => {
  const session = useSession();

  return (
    <S.Wrapper>
      <Menu session={session} />
      <Calender session={session} />
    </S.Wrapper>
  );
};

export default Calenderpage;
