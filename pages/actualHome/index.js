import * as S from "./index.styled";
import { supabase } from "../../utils/supabaseClient";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import FriendList from "../../components/FriendList/friendList";
import DisplayDates from "../../components/DisplayDates/DisplayDates";
import Menu from "../../components/Menu/Menu";

const actualHome = () => {
  const session = useSession();
  const [fetchError, setFetchError] = useState(null);
  const supabase = useSupabaseClient();
  useEffect(() => {}, [session]);

  return (
    <S.actualHomeWrapper>
      <h1>Actual Home</h1>
      <Menu session={session}></Menu>
      <FriendList session={session} />
      <DisplayDates session={session} />
    </S.actualHomeWrapper>
  );
};

export default actualHome;
