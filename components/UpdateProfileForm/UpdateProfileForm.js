import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "../../pages/signup/index.styled";
import { useRouter } from "next/router";

export default function UpdateProfileForm({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {}, [session]);

  // Updates the userdata!
  async function connectTables(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const username = event.target.username.value;
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ username: username, name: name, id: user.id });
    router.push("/loggedinhome");
  }

  function reRoute() {
    router.push("/home");
  }

  return (
    <S.signUpDiv>
      <S.signUpSection>
        <S.signUpHeading>Step two construncting</S.signUpHeading>
        <S.signUpText>
          Come up with a cool username and fill in your name so your friends can
          find you easier!
        </S.signUpText>
        <S.signUpForm onSubmit={connectTables}>
          <S.signUpLabel htmlFor="email">Username</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder="Write your username here"
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
            <S.signUpButton
              className="button block"
              onClick={() => {
                supabase.auth.signOut();
                reRoute;
              }}
            >
              Sign Out
            </S.signUpButton>
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
