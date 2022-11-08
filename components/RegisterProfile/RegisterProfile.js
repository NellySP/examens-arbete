import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../../pages/signup/index.styled";
import { useRouter } from "next/router";

export default function RegisterProfile({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {}, [session]);

  // Updates the userdata and connects auth table to profiles table.
  async function updateProfile(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const username = event.target.username.value;
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ username: username, name: name, id: user.id });
    router.push("/friends");
  }

  function reRoute() {
    router.push("/home");
  }

  return (
    <S.signUpDiv>
      <S.signUpSection>
        <S.signUpHeading>Steg två</S.signUpHeading>
        <S.signUpText>
          Välj ett coolt användarnamn och fyll i ditt namn så att dina vänner
          kan hitta dig!
        </S.signUpText>
        <S.signUpForm onSubmit={updateProfile}>
          <S.signUpLabel htmlFor="email">Användarnamn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder="Fyll i användarnamn här!"
          ></S.signUpInput>
          <S.signUpLabel htmlFor="name">Namn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="name"
            name="name"
            placeholder="Fyll i namn här!"
          ></S.signUpInput>
          <S.signUpButton type="submit">Slutför registrering</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
}
