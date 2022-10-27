import * as S from "./LoggedInHome.styled";
import { useEffect } from "react";

import DisplayDates from "../../components/DisplayDates/DisplayDates";
import FriendList from "../FriendList/FriendList";

const LoggedInHome = ({ session }) => {
  useEffect(() => {}, [session]);

  return (
    <S.actualHomeWrapper>
      <S.homeDiv>
        <DisplayDates session={session} />
        <FriendList session={session} />
      </S.homeDiv>
    </S.actualHomeWrapper>
  );
};

export default LoggedInHome;
