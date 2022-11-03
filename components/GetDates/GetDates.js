import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const GetDates = ({ session, friendId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchAvailableDates(friendId);
  }, [session]);

  // Fetch available dates here

  const fetchAvailableDates = async (friendId) => {
    const { data, error } = await supabase.rpc("testing_five", {
      user_id_input: user.id,
      friend_id_input: friendId,
    });
    const currentDate = [];

    for (let i = 0; i < data.length; i++) {
      const date = data[i].date;
      currentDate.push(date);
    }
    setDates(currentDate);
  };
  console.log(dates);

  return (
    <div>
      {dates && (
        <S.dateDiv>
          {dates.map((date) => (
            <div key={date}>
              <p>{date}</p>
            </div>
          ))}
        </S.dateDiv>
      )}
    </div>
  );
};

export default GetDates;
