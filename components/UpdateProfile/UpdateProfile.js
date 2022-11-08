import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./UpdateProfile.styled";

export default function UpdateProfile({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {}, [session]);

  // Updates the userdata!
  async function updateProfile(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const username = event.target.username.value;
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ username: username, name: name, id: user.id });
  }

  return (
    <S.signUpDiv>
      <S.signUpSection>
        <h2>Uppdatera din profil</h2>
        <S.signUpText>Ändra namn eller användarnamn här</S.signUpText>
        <S.signUpForm onSubmit={updateProfile}>
          <S.signUpLabel htmlFor="email">Användarnamn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder="Fyll i användarnamn här"
          ></S.signUpInput>
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
        <S.signUpForm onSubmit={updateProfile}>
          <S.signUpLabel htmlFor="name">Namn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="name"
            name="name"
            placeholder="Fyll i namn här"
          ></S.signUpInput>
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
}
