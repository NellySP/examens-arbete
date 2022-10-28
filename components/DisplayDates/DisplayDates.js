import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const DisplayDates = ({ session }) => {
  useEffect(() => {
    fetchAvailableDates();
  }, [session]);
  //   Vilken variant kör vi? Denna?
  const supabase = useSupabaseClient();
  const user = useUser();

  // SELECT date, COUNT(date)
  // FROM available_dates
  // where user_id = '3d55a83d-cb36-4d34-838a-5db2eb127b2a'
  // or user_id = '43a4d72c-5e6d-4098-92c9-ee11316b1292'
  // GROUP BY date
  // HAVING COUNT(date) > 1;

  //   Fetch available dates here
  const fetchAvailableDates = async () => {
    const { data, error } = await await supabase
      .from("available_dates")
      .select()
      // .eq("user_id", user.id);
      .or(
        `or(user_id.eq.${user.id},user_id.eq.6d63176d-aad5-4912-a017-a5dc4d05c21a)`
      );
    console.log(data);
  };

  return (
    <S.dateDisplayDiv>
      <p>Display all available dates here</p>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
