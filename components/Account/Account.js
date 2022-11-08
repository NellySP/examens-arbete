import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../RegisterProfile/RegisterProfile.styled";
import LoggedInHome from "../LoggedInHome/LoggedInHome";
import RegisterProfile from "../RegisterProfile/RegisterProfile";

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
        <div>
          <LoggedInHome session={session} />
        </div>
      ) : (
        <S.signUpDiv>
          <RegisterProfile session={session} />
        </S.signUpDiv>
      )}
    </div>
  );
}
