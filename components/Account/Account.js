import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../../pages/signup/index.styled";
import { useRouter } from "next/router";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import LoggedInHome from "../LoggedInHome/LoggedInHome";
import Menu from "../Menu/Menu";
import SignUpProfile from "../../pages/signupprofile";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
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

    if ((data.lenght = 0)) {
      return setProfile(false);
    } else {
      return setProfile(true);
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
          <UpdateProfileForm session={session} />
        </S.signUpDiv>
      )}
    </div>
  );
}
