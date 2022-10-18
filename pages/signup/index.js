import { supabase } from "../../utils/supabaseClient";

const SignUp = () => {
  async function testSignUp() {
    const { data, error } = await supabase.from("users_nelly").insert({
      username: "Denmark",
      name: "Denmark",
      password: "Denmark",
      email: "Denmark",
    });
  }

  return (
    <div>
      <div>
        <h1>Sign Up!</h1>
        <button onClick={() => testSignUp()}>SIGN UP HERE</button>
      </div>
    </div>
  );
};

export default SignUp;
