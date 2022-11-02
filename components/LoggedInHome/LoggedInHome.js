import * as S from "./LoggedInHome.styled";
import { useEffect } from "react";
import DisplayDates from "../../components/DisplayDates/DisplayDates";
import FriendList from "../FriendList/FriendList";

const LoggedInHome = ({ session }) => {
  useEffect(() => {}, [session]);

  return (
    <div>
      <DisplayDates session={session} />
    </div>
  );
};

export default LoggedInHome;
