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

    console.log(data.length);

    if (data.length == 1) {
      setProfile(true);
      console.log("yay");
    } else {
      setProfile(false);
      console.log("testett");
    }
  }
  console.log(profile);

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
