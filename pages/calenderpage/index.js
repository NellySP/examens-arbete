import Calender from "../../components/Calender/Calender";
import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";

const Calenderpage = () => {
  const session = useSession();

  return (
    <GS.Wrapper>
      <Menu session={session} />
      <GS.Div>
        <Calender session={session} />
      </GS.Div>
    </GS.Wrapper>
  );
};

export default Calenderpage;
