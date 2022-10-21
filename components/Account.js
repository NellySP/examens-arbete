import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../pages/signup/index.styled";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {}, [session]);

  async function connectTables(event) {
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
        <S.signUpHeading>Step two construncting</S.signUpHeading>
        <S.signUpText>Welcome</S.signUpText>
        <S.signUpForm onSubmit={connectTables}>
          <S.signUpLabel htmlFor="email">Username</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder="Come up with an awesome username and write it here"
          ></S.signUpInput>
          <S.signUpLabel htmlFor="name">Name</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="name"
            name="name"
            placeholder="Write your name here"
          ></S.signUpInput>
          <S.signUpButton type="submit">Complete signup</S.signUpButton>
          <div>
            <button
              className="button block"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
  // <div className="form-widget">
  //   <div>
  //     <label htmlFor="email">Email</label>
  //     <input id="email" type="text" value={session.user.email} disabled />
  //   </div>
  //   <div>
  //     <label htmlFor="username">Username</label>
  //     <input
  //       id="username"
  //       type="text"
  //       value={username || ""}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //   </div>

  //   <div>
  //     <button onClick={() => connectTables()}>connect</button>
  //     <button
  //       className="button primary block"
  //       onClick={() => updateProfile({ username })}
  //       disabled={loading}
  //     >
  //       {loading ? "Loading ..." : "Update"}
  //     </button>
  //   </div>

  //   <div>
  //     <button
  //       className="button block"
  //       onClick={() => supabase.auth.signOut()}
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // </div>
  // );
}
