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

  //   Fetch available dates here
  const fetchAvailableDates = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("available_dates").select();
  };
  console.log("dont fail me now or now");

  return (
    <S.dateDisplayDiv>
      <p>DET HÄR SKA FUNKA ANNARS HOPPAS JAG FRÅN BRON</p>
    </S.dateDisplayDiv>
  );
};

export default FriendList;
