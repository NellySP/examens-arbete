import * as S from "./index.styled";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import FriendList from "../../components/FriendList/friendList";
import DisplayDates from "../../components/DisplayDates/DisplayDates";
import Menu from "../../components/Menu/Menu";

const actualHome = () => {
  const session = useSession();
  useEffect(() => {}, [session]);

  return (
    <S.actualHomeWrapper>
      <Menu session={session} />
      <S.homeDiv>
        <FriendList session={session} />
        <DisplayDates session={session} />
      </S.homeDiv>
    </S.actualHomeWrapper>
  );
};

export default actualHome;
