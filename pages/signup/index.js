import { supabase } from "../../utils/supabaseClient";
import * as S from "./index.styled";

const SignUp = () => {
  async function testSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;

    async function signInWithEmail() {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        redirectTo: "http://localhost:3000/signupprofile",
      });
    }
    signInWithEmail();
  }

  return (
    <S.signUpDiv>
      {/* VI ANVÄNDER INTE DENNA JUST NU */}
      {/* <S.signUpSection>
        <S.signUpHeading>Sign Up, step one</S.signUpHeading>
        <S.signUpText>Fill in your email to receive a magic link.</S.signUpText>
        <S.signUpForm onSubmit={testSignUp}>
          <S.signUpLabel htmlFor="email">Email</S.signUpLabel>
          <S.signUpInput
            type="email"
            id="email"
            name="email"
            placeholder="Write your email here please"
          ></S.signUpInput>
          <S.signUpButton type="submit">Go to next step</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection> */}
    </S.signUpDiv>
  );
};

export default SignUp;
