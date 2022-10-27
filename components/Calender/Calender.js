import * as S from "./Calender.styled";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import Link from "next/link";

const Calender = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  const toDayDate = new Date();
  const tomorrow = addDays(toDayDate, 1);

  useEffect(() => {}, [session]);

  console.log(tomorrow);

  // Check if date and user already exist in database. If not. Add new row.

  async function addAvailableDate(event) {
    event.preventDefault();
    const date = event.target.date.value;

    const { data, error } = await supabase
      .from("available_dates")
      .select()
      .or(`and(date.eq.${date},user_id.eq.${user.id})`);

    if (error) {
      setFetchError("Välj ett datum");
    }

    // if data is returned, check length

    if (data) {
      data.length;
      setFetchError(null);
    }
    // if length of returned array = 0, insert submitted data

    if (data == 0) {
      const { data, error } = await supabase
        .from("available_dates")
        .insert({ date: date, user_id: user.id });
    }
    error;
  }

  return (
    <S.calenderDiv>
      {session ? (
        <S.calenderSection>
          <S.calenderHeading>Kalender</S.calenderHeading>
          <S.calenderForm onSubmit={addAvailableDate}>
            <input type="date" id="date" name="date"></input>
            <S.calenderButton type="submit">Add date</S.calenderButton>
            {fetchError}
          </S.calenderForm>
        </S.calenderSection>
      ) : (
        <S.calenderSection>
          <p>Du är inte inloggad. </p>
          <Link href="/">Logga in här</Link>
        </S.calenderSection>
      )}
    </S.calenderDiv>
  );
};

export default Calender;
