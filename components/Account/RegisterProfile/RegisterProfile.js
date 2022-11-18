import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./RegisterProfile.styled";
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
    <S.registerProfileDiv>
      <S.registerProfileSection>
        <h2>Registrering: Steg två</h2>
        <S.registerProfileText>
          Välj ett coolt användarnamn och fyll i ditt namn så att dina vänner
          kan hitta dig!
        </S.registerProfileText>
        <S.registerProfileForm onSubmit={updateProfile}>
          <S.registerProfileLabel htmlFor="email">
            Användarnamn
          </S.registerProfileLabel>
          <S.registerProfileInput
            type="text"
            id="username"
            name="username"
            placeholder="Fyll i användarnamn här!"
          ></S.registerProfileInput>
          <S.registerProfileLabel htmlFor="name">Namn</S.registerProfileLabel>
          <S.registerProfileInput
            type="text"
            id="name"
            name="name"
            placeholder="Fyll i namn här!"
          ></S.registerProfileInput>
          <S.registerProfileButton type="submit">
            Slutför registrering
          </S.registerProfileButton>
        </S.registerProfileForm>
      </S.registerProfileSection>
    </S.registerProfileDiv>
  );
}
