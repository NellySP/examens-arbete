import Calender from "../../components/Calender/Calender";
import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import NewCalender from "../../components/NewCalender/NewCalender";

const Calenderpage = () => {
  const session = useSession();

  return (
    <GS.Wrapper>
      <Menu session={session} />
      {session ? (
        <GS.Div>
          <NewCalender session={session} />
        </GS.Div>
      ) : (
        <div>Du är inte inloggad placeholder</div>
      )}
    </GS.Wrapper>
  );
};

export default Calenderpage;
