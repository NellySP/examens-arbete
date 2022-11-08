import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./UpdateProfile.styled";

export default function UpdateProfile({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [nameMessage, setNameMessage] = useState();
  const [usernameMessage, setUsernameMessage] = useState();

  useEffect(() => {
    fetchUserData();
  }, [session]);

  // Fetch user data from profiles!
  async function fetchUserData(event) {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id);
    setName(data[0].name);
    setUserName(data[0].username);
  }
  // Updates the username!
  async function updateUsername(event) {
    event.preventDefault();
    const username = event.target.username.value;
    await supabase.from("profiles").upsert({ username: username, id: user.id });
    setUsernameMessage("Användarnamn uppdaterat!");
    fetchUserData();
  }

  // Updates the name!
  async function updateName(event) {
    event.preventDefault();
    const name = event.target.name.value;
    await supabase.from("profiles").upsert({ name: name, id: user.id });
    setNameMessage("Namn uppdaterat!");
    fetchUserData();
  }

  // Remove message after 5 seconds
  setTimeout(function () {
    if (usernameMessage != null) {
      setUsernameMessage(null);
    }
  }, 5000);

  // Remove message after 5 seconds
  setTimeout(function () {
    if (nameMessage != null) {
      setNameMessage(null);
    }
  }, 5000);

  return (
    <S.signUpDiv>
      <S.signUpSection>
        <S.signUpHeading>Uppdatera din profil</S.signUpHeading>
        <S.signUpText>Ändra namn eller användarnamn här</S.signUpText>
        <S.signUpForm onSubmit={updateUsername}>
          <S.signUpLabel htmlFor="email">Användarnamn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder={userName}
          ></S.signUpInput>
          {usernameMessage}
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
        <S.signUpForm onSubmit={updateName}>
          <S.signUpLabel htmlFor="name">Namn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="name"
            name="name"
            placeholder={name}
          ></S.signUpInput>
          {nameMessage}
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
}
