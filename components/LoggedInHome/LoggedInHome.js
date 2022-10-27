import * as S from "./LoggedInHome.styled";
import { useEffect } from "react";
import FriendList from "../../components/FriendList/friendList";
import DisplayDates from "../../components/DisplayDates/DisplayDates";
import Menu from "../../components/Menu/Menu";

const LoggedInHome = ({ session }) => {
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

export default LoggedInHome;
