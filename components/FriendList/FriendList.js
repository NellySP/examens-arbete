import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./FriendList.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const FriendList = ({ session }) => {
  useEffect(() => {}, [session]);
  //   Vilken variant kör vi? Denna?
  const supabase = useSupabaseClient();
  const user = useUser();

  //   Fetch users friends here
  const fetchFriends = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("friends").select();
  };

  return (
    <S.friendListWrapperDiv>
      <p>Display users friends</p>
    </S.friendListWrapperDiv>
  );
};

export default FriendList;
