import Menu from "../../components/Menu/Menu";
import * as GS from "../index.styled";
import { useSession } from "@supabase/auth-helpers-react";
import Calender from "../../components/Calender/Calender";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Calenderpage = () => {
  const router = useRouter();
  const session = useSession();

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
          <Calender session={session} />
        </GS.Div>
      ) : (
        // It should not get here, but it's a backup
        <div>Du är inte inloggad</div>
      )}
    </GS.Wrapper>
  );
};

export default Calenderpage;
