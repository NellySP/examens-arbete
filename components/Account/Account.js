import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../RegisterProfile/RegisterProfile.styled";
import * as Style from "../Account/Account.styled";
import RegisterProfile from "../RegisterProfile/RegisterProfile";
import DisplayDates from "../DisplayDates/DisplayDates";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [profile, setProfile] = useState(true);

  useEffect(() => {
    checkIfProfileExists();
  }, [session]);

  //checks if person already exists in profiles.

  async function checkIfProfileExists() {
    const { data, errror } = await supabase
      .from("profiles")
      // .select(`id.eq.${user.id}`);
      .select("id")
      .eq("id", user.id);

    if (data.length == 1) {
      setProfile(true);
    } else {
      setProfile(false);
    }
  }

  return (
    <div>
      {profile ? (
        <Style.Wrapper>
          <DisplayDates session={session} />
        </Style.Wrapper>
      ) : (
        <S.registerProfileDiv>
          <RegisterProfile session={session} />
        </S.registerProfileDiv>
      )}
    </div>
  );
}
