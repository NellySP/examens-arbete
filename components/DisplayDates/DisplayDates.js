import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const DisplayDates = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    fetchAvailableDates();
  }, [session]);

  // Fetch available dates here
  const fetchAvailableDates = async () => {
    const { data, error } = await supabase
      .from("available_dates")
      .select("date")
      // .eq("user_id", user.id);
      .or(
        `or(user_id.eq.${user.id},user_id.eq.6d63176d-aad5-4912-a017-a5dc4d05c21a)`
      );
  };

  // const friendArray
  // const myArray.map(item => friendArray.includes(item.date))

  const testfunktion = async () => {
    const { data, error } = await supabase.rpc("testing_six", {
      user_id_input: user.id,
      friend_id_input: user.id,
    });

    const result = JSON.stringify(data);
    console.log(result + "Hejsan");
  };
  testfunktion();

  return (
    <S.dateDisplayDiv>
      <p>Display all available dates here</p>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
