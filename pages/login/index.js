import { supabase } from "../../utils/supabaseClient";
import * as S from "./index.styled";

const Login = () => {
  async function testSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    async function signInWithEmail() {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });
    }
    signInWithEmail();
  }

  return (
    <S.loginDiv>
      <S.loginSection>
        <S.loginHeading>Log in</S.loginHeading>
        <S.loginText>Log in here to find nothing!</S.loginText>
        <S.loginForm onSubmit={testSignUp}>
          <S.loginLabel htmlFor="email">Email</S.loginLabel>
          <S.loginInput
            type="email"
            id="email"
            name="email"
            placeholder="Write your email here please"
          ></S.loginInput>
          <S.loginLabel htmlFor="password">Password</S.loginLabel>
          <S.loginInput
            type="password"
            id="password"
            name="password"
            placeholder="**********"
          ></S.loginInput>
          <S.loginButton type="submit">Log in</S.loginButton>
        </S.loginForm>
      </S.loginSection>
    </S.loginDiv>
  );
};

export default Login;
