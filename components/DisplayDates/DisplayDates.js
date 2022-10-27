import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const DisplayDates = ({ session }) => {
  useEffect(() => {}, [session]);
  //   Vilken variant kör vi? Denna?
  const supabase = useSupabaseClient();
  const user = useUser();

  //   Fetch available dates here
  const fetchAvailableDates = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("available_dates").select();
  };

  return (
    <S.dateDisplayDiv>
      <p>Display all available dates here</p>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
