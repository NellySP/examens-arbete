import { supabase } from "../../utils/supabaseClient";
import * as S from "./index.styled";
import { formatDistance, subDays } from "date-fns";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { useEffect } from "react";

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

const Calender = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const toDayDate = new Date();
  const tomorrow = addDays(toDayDate, 1);

  useEffect(() => {}, [session]);

  console.log(tomorrow);

  async function addAvailableDate(event) {
    event.preventDefault();
    const date = event.target.date.value;

    const { data, error } = await supabase
      .from("available_dates")
      .insert({ date: date, user_id: user.id });

    console.log(data);
  }

  return (
    <S.loginDiv>
      <S.loginSection>
        <S.loginHeading>Calender</S.loginHeading>
        <S.loginForm onSubmit={addAvailableDate}>
          <input type="date" id="date" name="date"></input>
          <S.loginButton type="submit">Add date</S.loginButton>
        </S.loginForm>
      </S.loginSection>
    </S.loginDiv>
  );
};

export default Calender;
