// import passwordHash from "../../utils/passwordHash";
import { supabase } from "../../utils/supabaseClient";
import * as S from "./index.styled";

const SignUp = () => {
  async function testSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const name = event.target.name.value;
    const password = event.target.password.value;

    // passwordHash(password);

    const { data, error } = await supabase.from("users_nelly").insert({
      username: username,
      name: name,
      password: password,
      email: email,
    });
  }

  return (
    <S.signUpDiv>
      <S.signUpSection>
        <S.signUpHeading>Sign Up</S.signUpHeading>
        <S.signUpText>
          Fill in the form below to sign up to our awesome site that doesn't
          work!
        </S.signUpText>
        <S.signUpForm onSubmit={testSignUp}>
          <S.signUpLabel htmlFor="email">Email</S.signUpLabel>
          <S.signUpInput
            type="email"
            id="email"
            name="email"
            placeholder="Write your email here please"
          ></S.signUpInput>
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
          <S.signUpLabel htmlFor="password">Password</S.signUpLabel>
          <S.signUpInput
            type="password"
            id="password"
            name="password"
            placeholder="Dont put 123 here"
          ></S.signUpInput>
          <S.signUpButton type="submit">Sign up here</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
};

export default SignUp;
